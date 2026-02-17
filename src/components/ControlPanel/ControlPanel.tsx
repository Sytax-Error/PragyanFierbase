import React from 'react';
import './ControlPanel.css';

interface ControlPanelProps {
  title: string;
  children: React.ReactNode;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ title, children }) => {
  return (
    <div className="control-panel">
      <h2 className="control-panel-title">{title}</h2>
      <div className="control-panel-content">{children}</div>
    </div>
  );
};

export default ControlPanel;
