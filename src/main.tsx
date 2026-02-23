
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
// =================================================================================================
// REDUX-PERSIST:
// The `PersistGate` delays the rendering of your app's UI until the persisted state has been
// retrieved and saved to Redux. This prevents your app from showing a loading state or
// incorrect data while the persisted state is being loaded.
//
// To remove redux-persist, you will also need to remove this `PersistGate` component
// and its import, along with the `persistor` import.
// =================================================================================================
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@/hooks/theme/ThemeProvider';
// Import the persistor along with the store
import { store, persistor } from '@/store';
import routes from '@/app/routes/routes';
import '@/index.css';
import '@/styles/layout.css'; // Import global layout styles
import '@/core/visualization/pluginload';

// Create the data router with the new object-based routes
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap the app in PersistGate */}
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
