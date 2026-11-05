import { configureStore } from '@reduxjs/toolkit';
import { bankApi } from './api/bank.api';

export const store = configureStore({
  reducer: {
    // 🏢 Выделили официальную полку для нашего цеха в глобальной памяти!
    [bankApi.reducerPath]: bankApi.reducer,
  },
  
  // 🔌 Включаем b2b-провода автоматического кэширования метро!
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
});