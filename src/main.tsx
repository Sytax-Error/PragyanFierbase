import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/hooks/theme/ThemeProvider';
import { store } from '@/store';
import routes from '@/app/routes/routes';
import '@/index.css';
import '@/styles/layout.css'; // Import global layout styles
import '@/core/visualization/pluginload';

// Create the data router with the new object-based routes
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
