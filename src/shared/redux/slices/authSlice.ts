import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserData } from '@/shared/lib/localstorage';

export interface AuthState {
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
      action: PayloadAction<AuthState>,
    ) => {
      state.user = action.payload.user;
      state.isSignedIn = action.payload.isSignedIn;
    },
    logout: (state) => {
      state.user = null;
      state.isSignedIn = false;
    },
  },
});

export const { setAuthInfo, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
