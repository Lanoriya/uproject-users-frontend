// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: { id: number; username: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action: PayloadAction<{ id: number; username: string }>) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUserStart, addUserSuccess, addUserFailure } = userSlice.actions;
export default userSlice.reducer;
