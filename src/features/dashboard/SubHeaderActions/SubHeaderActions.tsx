
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubHeaderActions.css';

const SubHeaderActions: React.FC = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/dashboards/add');
  };

  return (
    <button 
      className="add-chart" 
      onClick={handleAddClick}
    >
      + Add Dashboard
    </button>
  );
};

export default SubHeaderActions;
