import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubHeader from '../components/SubHeader/SubHeader';
import { useTheme } from '../../hooks/theme/useTheme';
import { useSubHeader } from '../../hooks/subHeader/useSubHeader';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const { subHeaderContent } = useSubHeader();

  return (
    <div className={`layout ${theme}`}>
      <Header />
      {subHeaderContent && <SubHeader>{subHeaderContent}</SubHeader>}
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
