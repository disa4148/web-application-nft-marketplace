interface EmailData {
  id: string;
  email: string;
  verified: boolean;
  token: string;
}

export interface AvatarData {
  id: string;
  icon: string | null;
  cover: string | null;
}

interface NotificationData {
  id: string;
  news: boolean;
}

interface MetaData {
  id: string;
  name: string;
  description: string | null;
}

export interface UserData {
  id: string;
  fullname: string;
  createdAt: string;
  email: EmailData;
  avatar: AvatarData;
  meta: MetaData;
  notification: NotificationData;
}

export const setUserData = (userData: UserData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } else {
    return null;
  }
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
};
