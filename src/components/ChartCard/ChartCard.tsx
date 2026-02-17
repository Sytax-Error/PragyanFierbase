import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaTrash, FaUpload, FaEdit, FaChartBar, FaTable, FaPlug } from 'react-icons/fa';
import './ChartCard.css';

const ChartCard = ({ chart }) => {
  const navigate = useNavigate();

  // Navigate to the edit page for the specific chart
  const handleNavigate = () => {
    navigate(`/edit-chart/${chart.dataset}/${chart.type}`);
  };

  return (
    <div className="chart-card" onClick={handleNavigate}>
      <div className="chart-card-header">
        <FaStar className="star-icon" />
        <h3 className="chart-name">{chart.name}</h3>
      </div>
      <div className="chart-card-body">
        <div className="chart-info">
          <FaChartBar className="chart-info-icon" />
          <span>{chart.type}</span>
        </div>
        <div className="chart-info">
          <FaTable className="chart-info-icon" />
          <span>{chart.dataset}</span>
        </div>
        <div className="chart-info">
          <FaPlug className="chart-info-icon" />
          <span>{chart.onDashboards}</span>
        </div>
      </div>
      <div className="chart-card-footer">
        <span className="owner-initials">{chart.owners}</span>
        <span className="last-modified">{chart.lastModified}</span>
        <div className="action-icons">
          <FaTrash onClick={(e) => { e.stopPropagation(); alert('Delete action'); }} />
          <FaUpload onClick={(e) => { e.stopPropagation(); alert('Upload action'); }} />
          <FaEdit />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
