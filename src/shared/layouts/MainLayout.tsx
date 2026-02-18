import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import SubHeader from '@/shared/components/SubHeader/SubHeader';
import { useTheme } from '@/hooks/theme/useTheme';
import { useSubHeader } from '@/hooks/subHeader/useSubHeader';
import '@/shared/layouts/MainLayout.css';

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
