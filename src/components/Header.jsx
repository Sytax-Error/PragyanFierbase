import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h2>DataViz</h2>
      </div>
      <nav className="navigation">
        <Link to="/">Dashboard</Link>
        <Link to="/charts">Charts</Link>
        <Link to="/datasets">Datasets</Link>
      </nav>
    </header>
  );
};

export default Header;
