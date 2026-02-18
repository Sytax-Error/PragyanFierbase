import React from 'react';
import type { BaseControlProps } from '@/core/controls/controlRegistry';
import './Slider.css';

interface SliderProps extends BaseControlProps {
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <div className="slider-control">
      <div className="slider-label-container">
        <label>{label}</label>
        <span className="slider-value">{value as number}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input"
      />
    </div>
  );
};

export default Slider;
