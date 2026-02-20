import React from 'react';
import { Outlet } from 'react-router-dom';
import '@/app/App.css';
import { useTheme } from '@/hooks/theme/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <Outlet />
    </div>
  );
}

export default App;
