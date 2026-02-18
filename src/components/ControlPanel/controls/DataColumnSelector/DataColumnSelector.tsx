import React from 'react';
import type { BaseControlProps } from '@/core/controls/controlRegistry';
import { CustomSelect } from '@/components';
import './DataColumnSelector.css';

interface DataColumnSelectorProps extends BaseControlProps {
  options?: string[];
}

const DataColumnSelector: React.FC<DataColumnSelectorProps> = ({ label, value, onChange, options = [] }) => {
  const selectOptions = options.map(col => ({
    value: col,
    label: col,
  }));

  return (
    <div className="data-column-selector">
      <label>{label}</label>
      <CustomSelect
        options={selectOptions}
        value={value as string}
        onChange={onChange}
        placeholder="Select a column"
      />
    </div>
  );
};

export default DataColumnSelector;