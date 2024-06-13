import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice, { AuthState } from './slices/authSlice';

function loadState() {
  if (typeof window !== 'undefined') {
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  }
  return {};
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: loadState() as { auth: AuthState },
});

store.subscribe(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  }
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
