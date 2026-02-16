import { configureStore } from '@reduxjs/toolkit';
import datasetReducer from './slices/datasetSlice';
import chartReducer from './slices/chartSlice';

console.log('Store: Configuring Redux store...');

export const store = configureStore({
  reducer: {
    datasets: datasetReducer,
    charts: chartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
