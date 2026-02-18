import React from 'react';
import AppRoutes from '@/app/routes/routes';
import '@/app/App.css';
import { useTheme } from '@/hooks/theme/useTheme';
import { SubHeaderProvider } from '@/hooks/subHeader/SubHeaderProvider';

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
