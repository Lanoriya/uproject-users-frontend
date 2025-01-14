// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'; // Импорт редьюсера для user

export const store = configureStore({
  reducer: {
    user: userReducer, // Добавление редьюсера для пользователя в хранилище
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
