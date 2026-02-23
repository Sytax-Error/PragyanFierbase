import React from 'react';
import './TextInput.css';
import type { BaseControlProps } from '@/core/controls/controlRegistry';

const TextInput: React.FC<BaseControlProps> = ({ label, value, onChange, config }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  // The <input> element expects a string value. We need to handle cases where
  // the value from the control system is not a string.
  const stringValue = (value === null || value === undefined) ? '' : String(value);

  return (
    <div className="text-input-container">
      <label className="text-input-label">{label}</label>
      <input
        type="text"
        className="text-input"
        value={stringValue}
        onChange={handleChange}
        {...config}
      />
    </div>
  );
};

export default TextInput;
