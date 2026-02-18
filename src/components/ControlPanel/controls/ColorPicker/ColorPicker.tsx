import React from 'react';
import type { BaseControlProps } from '@/core/controls/controlRegistry';
import './ColorPicker.css';

interface ColorPickerProps extends BaseControlProps {}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="color-picker-control">
      <label>{label}</label>
      <input
        type="color"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        className="color-picker-input"
      />
    </div>
  );
};

export default ColorPicker;