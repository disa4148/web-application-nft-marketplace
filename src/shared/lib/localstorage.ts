interface PayoutMethod {
  _id: string;
  name: string;
  description: string;
}

export interface UserData {
  _id: string;
  login: string;
  balance: number;
  password: string;
  payout_method: PayoutMethod;
  block_payout: boolean;
  verification: boolean;
  emoji: string;
  id: string;
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
