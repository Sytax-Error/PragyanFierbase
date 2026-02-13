import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h2>DataViz</h2>
      </div>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`navigation ${isMenuOpen ? 'is-open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
        <Link to="/charts" className="nav-link" onClick={() => setIsMenuOpen(false)}>Charts</Link>
        <Link to="/datasets" className="nav-link" onClick={() => setIsMenuOpen(false)}>Datasets</Link>
      </nav>
    </header>
  );
};

export default Header;
