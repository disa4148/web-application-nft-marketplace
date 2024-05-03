import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserData } from '@/shared/lib/localstorage';

interface AuthState {
  user: UserData | null;
  isSignedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (
      state,
      action: PayloadAction<{ user: UserData | null; isSignedIn: boolean }>,
    ) => {
      state.user = action.payload.user;
      state.isSignedIn = action.payload.isSignedIn;
    },
  },
});

export const { setAuthInfo } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
