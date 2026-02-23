import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/hooks/theme/useTheme';
import { Settings, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${theme}`}>
      <div className="logo">
        <NavLink to="/">Logo</NavLink>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/dashboards">Dashboards</NavLink>
        <NavLink to="/charts">Charts</NavLink>
        <NavLink to="/datasets">Datasets</NavLink>
      </nav>
      <div className="header-actions">
        <button className="action-button">
          <Settings />
        </button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
