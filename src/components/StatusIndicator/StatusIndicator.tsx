import React from 'react';
import { FaSpinner, FaExclamationTriangle, FaQuestionCircle } from 'react-icons/fa';
import './StatusIndicator.css';

type StatusIndicatorProps = {
  status: 'loading' | 'error' | 'not-found' | 'info';
  message: string;
};

const iconMap = {
  loading: <FaSpinner className="status-icon spin" />,
  error: <FaExclamationTriangle className="status-icon error" />,
  'not-found': <FaQuestionCircle className="status-icon not-found" />,
  info: <FaQuestionCircle className="status-icon info" />,
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
