import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../../hooks/theme/useTheme';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`layout ${theme}`}>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
