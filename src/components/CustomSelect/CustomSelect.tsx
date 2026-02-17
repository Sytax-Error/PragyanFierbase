import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './CustomSelect.css';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = 'Select an option' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectContainerRef.current && !selectContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectContainerRef]);

  const selectedOptionLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="custom-select-container" ref={selectContainerRef}>
      <div
        className={`custom-select-value ${isDropdownOpen ? 'open' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-placeholder={!value}
      >
        <span>{selectedOptionLabel}</span>
        <FiChevronDown className="dropdown-icon" />
      </div>
      {isDropdownOpen && (
        <ul className="custom-select-options">
          {options.map(option => (
            <li
              key={option.value}
              className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsDropdownOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
