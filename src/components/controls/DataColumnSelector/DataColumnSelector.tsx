import React from 'react';
import './DataColumnSelector.css';

interface DataColumnSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  columns: string[];
}

const DataColumnSelector: React.FC<DataColumnSelectorProps> = ({ label, value, onChange, columns }) => {
  return (
    <div className="data-column-selector">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>Select a column</option>
        {columns.map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );
};

export default DataColumnSelector;
