import React from 'react';
import './Footer.css';
import { useTheme } from '../../hooks/theme/useTheme';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <p>&copy; 2024 DataViz. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
