import { configureStore } from '@reduxjs/toolkit';
import datasetReducer from '../features/datasets/datasetSlice';

console.log('Store: Configuring Redux store...');

export const store = configureStore({
  reducer: {
    datasets: datasetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
