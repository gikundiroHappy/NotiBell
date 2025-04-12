import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store';
import { useColorScheme } from 'nativewind';

interface UserData {
  email: string;
  fullname: string;
  profUrl: string;
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
