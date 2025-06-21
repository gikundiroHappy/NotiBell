import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB, REALTIME_DB } from '@/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store';
import { useColorScheme } from 'nativewind';
import { getDatabase, off, onValue, ref, set, update } from 'firebase/database';
import { sendLocalNotification } from '../services/notification';

interface UserData {
  email: string;
  fullname: string;
  profUrl: string;
}

export interface DoorbellEvent {
  id: string;
  message: string;
  timestamp: number;
  status: 'waiting' | 'responded' | 'timeout';
  response?: string;
  pressed: boolean;
  read: boolean;
  responseTimestamp?: number
}

interface ContextType {
  Register: (
    email: string,
    password: string,
    fullname: string
  ) => Promise<boolean>;
  Login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserData: (newData: UserData) => void;
  changeMode: () => Promise<void>;
  error: string;
  isLoggedIn: boolean;
  userData: UserData | null;
  darkMode: boolean;
  doorbellEvents: DoorbellEvent[];
  sendResponse: (eventId: string, message: string) => Promise<void>;
  markAsRead: (eventId: string) => Promise<void>;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const { setColorScheme } = useColorScheme();
  const [doorbellEvents, setDoorbellEvents] = useState<DoorbellEvent[]>([]);

  const fetchCurrentUserData = async () => {
    try {
      const userUID = await getItemAsync('userUID');

      if (userUID) {
        const userDocRef = await getDoc(doc(FIREBASE_DB, 'user', userUID));
        if (userDocRef.exists()) {
          setUserData(userDocRef.data() as UserData);
        }
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const isLogged = async () => {
    try {
      const userTok = await getItemAsync('userToken');
      if (userTok != null) {
        setIsLoggedIn(true);
        await fetchCurrentUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await setItemAsync('darkMode', JSON.stringify(newMode));
    setColorScheme(newMode ? 'dark' : 'light');
  };

  const savedMode = async () => {
    const stored = await getItemAsync('darkMode');
    const isDark = stored === 'true';
    setDarkMode(isDark);
    setColorScheme(isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    savedMode();
    isLogged();
  }, []);

  const updateUserData = (newData: UserData) => {
    setUserData(newData);
  };

  // useEffect(() => {
  //   if (!isLoggedIn) return;

  //   // Reference to the doorbell logs in Firebase
  //   const doorbellRef = ref(REALTIME_DB, 'doorbellLogs');
    
  //   // Listen for value changes
  //   const unsubscribe = onValue(doorbellRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const events: DoorbellEvent[] = [];
        
  //       // Convert Firebase object to array
  //       Object.keys(data).forEach((key) => {
  //         const event = data[key];
  //         events.push({
  //           id: key,
  //           message: 'Visitor at the door',
  //           timestamp: event.timestamp || Date.now(),
  //           status: event.status || 'waiting',
  //           response: event.response,
  //           pressed: event.pressed || false,
  //           read: false // Default to unread
  //         });
  //       });

  //       // Sort by timestamp (newest first)
  //       events.sort((a, b) => b.timestamp - a.timestamp);
  //       // console.log('first events', events);
  //       setDoorbellEvents(events);
  //     }
  //   });

  //   return () => {
  //     // Clean up listener when component unmounts
  //     off(doorbellRef);
  //   };
  // }, [isLoggedIn]);

  // In your ContextProvider

  useEffect(() => {
  if (!isLoggedIn) return;

  const doorbellRef = ref(REALTIME_DB, 'doorbellLogs');
  
  const unsubscribe = onValue(doorbellRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const events: DoorbellEvent[] = [];
      
      Object.keys(data).forEach((key) => {
        const event = data[key];
        events.push({
          id: key,
          message: 'Visitor at the door',
          timestamp: event.timestamp || Date.now(),
          status: event.status || 'waiting',
          response: event.response,
          responseTimestamp: event.responseTimestamp,
          pressed: event.pressed || false,
          read: event.read
        });

        // Check if this is a new event that needs a notification
        if (event.pressed && !event.response && !event.status) {
          console.log("first, sending notification for event:", event.pressed );
          sendLocalNotification('Doorbell', 'Someone is at your door!');
        }
      });

      events.sort((a, b) => b.timestamp - a.timestamp);
      setDoorbellEvents(events);
    }
  });

  return () => {
    off(doorbellRef);
  };
}, [isLoggedIn]);

  const sendResponse = async (eventId: string, message: string) => {
    try {
      const responseTimestamp = Date.now();

      await set(ref(REALTIME_DB, `doorbellLogs/${eventId}/response`), message);
      await set(ref(REALTIME_DB, `doorbellLogs/${eventId}/status`), 'responded');
      await update(ref(REALTIME_DB, `doorbellLogs/${eventId}`), {
        response: message,status: 'responded', responseTimestamp,
      });
    } catch (error) {
      console.error('Error sending response:', error);
      throw error;
    }
  };

  const markAsRead = async (eventId: string) => {
    try {
      // Updated local state for immediate UI feedback
      setDoorbellEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId ? { ...event, read: true } : event
        )
      );
      
    // stored read status in Firebase
    const db = getDatabase();
    const eventRef = ref(db, `doorbellLogs/${eventId}`);
    await update(eventRef, { read: true });

    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  return (
    <Context.Provider
      value={{
        Register: async (email, password, fullname) => {
          try {
            const { user } = await createUserWithEmailAndPassword(
              FIREBASE_AUTH,
              email,
              password
            );

            const userData = {
              email,
              fullname,
              profUrl:
                'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
            };

            await setDoc(doc(FIREBASE_DB, 'user', user.uid), userData);

            return true;
          } catch (error: any) {
            setError(error.code);
            return false;
          }
        },

        Login: async (email, password) => {
          try {
            const { user } = await signInWithEmailAndPassword(
              FIREBASE_AUTH,
              email,
              password
            );

            const userToken = await user.getIdToken();
            await setItemAsync('userToken', userToken);
            await setItemAsync('userUID', user.uid);

            const userDocRef = await getDoc(doc(FIREBASE_DB, 'user', user.uid));

            if (userDocRef.exists()) {
              setUserData(userDocRef.data() as UserData);
              setIsLoggedIn(true);
              return true;
            }
            return false;
          } catch (error: any) {
            setError(error.code);
            return false;
          }
        },

        logout: async () => {
          await FIREBASE_AUTH.signOut();
          setIsLoggedIn(false);
          await deleteItemAsync('userToken');
          setUserData(null);
        },

        updateUserData,
        error,
        isLoggedIn,
        userData,
        changeMode,
        darkMode,
        doorbellEvents,
        sendResponse,
        markAsRead,
      }}
    >
      {children}
    </Context.Provider>
  );
};
