
export interface chatData {
    id: number;
    message: string;
    time: Date;
    read: boolean;
  }

export const chatsList: chatData[] = [ 
    { 
      id: 1, 
      message: 'Someone rang your Gate doorbell 1 send a quick message to communicate them...', 
      time: new Date(), 
      read: false, 
    }, 
    { 
      id: 2, 
      message: 'Someone rang your Gate doorbell 2 send a quick message to communicate them...', 
      time: new Date('2024-05-01T17:47:00'), 
      read: true, 
    }, 
    { 
      id: 3, 
      message: 'Someone rang your Gate doorbell 3 send a quick message to communicate them...', 
      time: new Date('2024-08-01T17:47:00'), 
      read: false, 
    }, 
    { 
      id: 4, 
      message: 'Someone rang your Gate doorbell 4 send a quick message to communicate them...', 
      time: new Date('2025-04-11T17:54:00'), 
      read: true, 
    }, 
    { 
      id: 5, 
      message: 'Someone rang your Gate doorbell 5 send a quick message to communicate them...', 
      time: new Date('2024-05-05T17:47:00'), 
      read: false, 
    } 
  ];