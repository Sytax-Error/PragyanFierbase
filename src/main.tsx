import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/hooks/theme/ThemeProvider';
import { store } from '@/store';
import App from '@/app/App';
import '@/index.css';
import '@/core/visualization/pluginload';

console.log('main.tsx: Rendering React app with all providers...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
