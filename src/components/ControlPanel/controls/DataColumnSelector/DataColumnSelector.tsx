import React from 'react';
import type { BaseControlProps } from '@/core/controls/controlRegistry';
import './DataColumnSelector.css';

interface DataColumnSelectorProps extends BaseControlProps {
  options?: string[];
}

const DataColumnSelector: React.FC<DataColumnSelectorProps> = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="data-column-selector">
      <label>{label}</label>
      <select value={value as string} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>Select a column</option>
        {options.map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );
};

export default DataColumnSelector;