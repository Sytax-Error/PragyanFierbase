import React from 'react';
import { Loader, AlertTriangle, HelpCircle } from 'lucide-react';
import './StatusIndicator.css';

type StatusIndicatorProps = {
  status: 'loading' | 'error' | 'not-found' | 'info';
  message: string;
};

const iconMap = {
  loading: <Loader className="status-icon spin" />,
  error: <AlertTriangle className="status-icon error" />,
  'not-found': <HelpCircle className="status-icon not-found" />,
  info: <HelpCircle className="status-icon info" />,
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, message }) => {
  const icon = iconMap[status];

  return (
    <div className="status-indicator-card">
      <div className="status-icon-container">{icon}</div>
      <p className="status-message">{message}</p>
    </div>
  );
};

export default StatusIndicator;
