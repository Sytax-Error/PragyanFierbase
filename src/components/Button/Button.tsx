
import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', glow = false, className = '', ...props }) => {
  const variantClass = `button-${variant}`;
  const glowClass = glow ? 'button-glow' : '';
  
  return (
    <button className={`custom-button ${variantClass} ${glowClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
