import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GreenAccount {
  link: string;
  state: string;
  price: number;
}

interface ServerResponse {
  message: string;
  total_green_price: number;
  progress: string;
  filtered_results: GreenAccount[];
}

interface UserState {
  users: { id: number; username: string }[]; // Список пользователей
  loading: boolean; // Индикатор загрузки
  error: string | null; // Сообщение об ошибке
  links: string[]; // Ссылки для проверки
  result: string; // Результат
  totalGreenPrice: number; // Общая сумма
  progress: string; // Прогресс
  serverData: ServerResponse | null; // Данные с сервера
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  links: [],
  result: '',
  totalGreenPrice: 0,
  progress: '',
  serverData: null, // Изначально пустое
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
    setLinks: (state, action: PayloadAction<string[]>) => {
      state.links = action.payload;
    },
    setResult: (state, action: PayloadAction<ServerResponse>) => {
      const { message, total_green_price, progress, filtered_results } = action.payload;
      state.result = message;
      state.totalGreenPrice = total_green_price;
      state.progress = progress;
      state.serverData = action.payload; // Сохраняем весь объект в state
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload; // Действие для установки ошибки
    },
  },
});

export const {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  setLinks,
  setResult,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
