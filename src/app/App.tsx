import React from 'react';
import AppRoutes from './routes/routes';
import './App.css';
import { useTheme } from '../hooks/theme/useTheme';
import { SubHeaderProvider } from '../hooks/subHeader/SubHeaderProvider';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <SubHeaderProvider>
        <AppRoutes />
      </SubHeaderProvider>
    </div>
  );
}

export default App;
