import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import postReducer from './Slices/postSlice.js';


export const store = configureStore({
  reducer: {
    user : userReducer,
    posts : postReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
