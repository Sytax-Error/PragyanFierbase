import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../context/Theme';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`layout ${theme}`}>
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
