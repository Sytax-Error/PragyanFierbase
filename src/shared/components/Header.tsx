import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/theme/useTheme';
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
        <Link to="/">DataViz</Link>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/charts">Charts</Link>
        <Link to="/datasets">Datasets</Link>
      </nav>
      <div className="header-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
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
