import React from 'react';
import { CustomSelect } from '@/components';
import type { BaseControlProps } from '@/core/controls/controlRegistry';
import './DataColumnSelector.css';

const DataColumnSelector: React.FC<BaseControlProps> = ({ label, value, onChange, options = [] }) => {
  // Filter out any non-string values from the options array and map to the format expected by CustomSelect.
  const selectOptions = (options as unknown[])
    .filter((opt): opt is string => typeof opt === 'string')
    .map(col => ({
      value: col,
      label: col,
    }));

  // Ensure the value passed to CustomSelect is a string.
  const stringValue = typeof value === 'string' ? value : '';

  return (
    <div className="data-column-selector">
      <label>{label}</label>
      <CustomSelect
        options={selectOptions}
        value={stringValue}
        onChange={onChange}
        placeholder="Select a column"
      />
    </div>
  );
};

export default DataColumnSelector;
