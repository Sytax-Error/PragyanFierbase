import React from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';
import SubHeader from '@/shared/components/SubHeader/SubHeader';
import { useTheme } from '@/hooks/theme/useTheme';
import '@/shared/layouts/MainLayout.css';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const matches = useMatches();
  const handle = matches.at(-1)?.handle as { subHeader?: React.ReactNode; noPadding?: boolean } | undefined;
  const noPadding = handle?.noPadding;

  return (
    <div className={`layout app ${theme}`}>
      <Header />
      {handle?.subHeader && <SubHeader>{handle.subHeader}</SubHeader>}
      <main className={`content ${noPadding ? 'no-padding' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
