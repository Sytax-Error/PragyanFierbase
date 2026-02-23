
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// =================================================================================================
// REDUX-PERSIST:
// This section configures Redux Persist, which saves the Redux store to local storage.
// This is a temporary solution for local development and data persistence.
// When you integrate a backend API, you can remove this persistence layer.
//
// To remove redux-persist:
// 1. Uninstall the package: `npm uninstall redux-persist`
// 2. Remove the imports for `persistStore`, `persistReducer`, and the related constants.
// 3. Remove the `persistConfig` object and the `persistedReducer`.
// 4. In `configureStore`, change `reducer: persistedReducer` back to `reducer: rootReducer`.
// 5. Remove the `middleware` configuration for `serializableCheck`.
// 6. Remove the `persistor` export.
// 7. In `src/main.tsx`, remove the `PersistGate` component and the `persistor` import.
// =================================================================================================
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import datasetReducer from './slices/datasetSlice';
import chartReducer from './slices/chartSlice';
import chartEditorReducer from './slices/chartEditorSlice';

console.log('Store: Configuring Redux store with persistence...');

// REDUX-PERSIST CONFIG:
// Defines the configuration for persisting the Redux state.
const persistConfig = {
  key: 'root', // The key for the persisted state in local storage.
  storage, // The storage engine to use (localStorage for web).
  whitelist: ['charts'], // We are only persisting the 'charts' slice of the Redux state.
  blacklist: ['chartEditor'] // We are explicitly not persisting the 'chartEditor' slice.
};

// Combine all the reducers into a single root reducer.
const rootReducer = combineReducers({
  datasets: datasetReducer,
  charts: chartReducer,
  chartEditor: chartEditorReducer,
});

// Create a persisted version of the root reducer.
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // Use the persisted reducer instead of the original root reducer.
  reducer: persistedReducer,
  // Middleware is configured to ignore actions dispatched by redux-persist,
  // which are not serializable and would otherwise cause errors in development.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// The persistor is used by the PersistGate in `main.tsx` to delay rendering
// until the persisted state is retrieved.
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
