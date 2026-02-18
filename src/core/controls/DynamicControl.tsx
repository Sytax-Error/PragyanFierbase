import React from 'react';
import { CONTROL_REGISTRY } from './controlRegistry';

interface DynamicControlProps {
  type: string;
  fieldKey: string;
  label: string;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  options?: unknown[]; 
  config?: Record<string, unknown>;
}

const DynamicControl: React.FC<DynamicControlProps> = ({
  type,
  fieldKey,
  label,
  value,
  onChange,
  options,
  config,
}) => {
  const ControlComponent = CONTROL_REGISTRY[type];

  if (!ControlComponent) {
    return (
      <div className="control-item">
        <label>{label}</label>
        <input
          type={type}
          value={(value as string) ?? ''}
          onChange={(e) => {
            const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
            onChange(fieldKey, val);
          }}
        />
      </div>
    );
  }

  return (
    <ControlComponent
      key={fieldKey}
      label={label}
      value={value}
      options={options}
      onChange={(val: unknown) => onChange(fieldKey, val)}
      {...config}
    />
  );
};

export default React.memo(DynamicControl);