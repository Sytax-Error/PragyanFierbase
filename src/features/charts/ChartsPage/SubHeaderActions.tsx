import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import '@/features/charts/ChartsPage/SubHeaderActions.css';

const SubHeaderActions: React.FC = () => {
  const navigate = useNavigate();

  const handleAddChartClick = () => {
    navigate('/add-chart');
  };

  return (
    <div className="charts-actions">
      <button className="bulk-select">Bulk select</button>
      <button className="add-chart" onClick={handleAddChartClick}>+ Chart</button>
      <button className="download-chart">
        <Upload />
      </button>
    </div>
  );
};

export default SubHeaderActions;
