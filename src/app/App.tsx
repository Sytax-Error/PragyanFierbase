import React from 'react';
import AppRoutes from './routes/routes';
import './App.css';
import { useTheme } from '../hooks/theme/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <AppRoutes />
    </div>
  );
}

export default App;
