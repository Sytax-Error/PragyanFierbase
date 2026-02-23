import React from 'react';
import './ControlPanel.css';
import ColorPicker from './controls/ColorPicker/ColorPicker';
import DataColumnSelector from './controls/DataColumnSelector/DataColumnSelector';
import Slider from './controls/Slider/Slider';
import TextInput from './controls/TextInput/TextInput';

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
export { ColorPicker, DataColumnSelector, Slider,TextInput };
