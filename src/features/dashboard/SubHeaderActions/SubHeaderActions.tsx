import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
      <Plus size={18} style={{ marginRight: '8px' }} />
      Dashboard
    </button>
  );
};

export default SubHeaderActions;
