import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Upload, FilePenLine, BarChart2, Database, LayoutGrid, Clock, User } from 'lucide-react';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import './ChartRow.css';

import type { Chart } from '@/store/slices/chartSlice';

interface ChartRowProps {
  chart: Chart;
}

const ChartRow: React.FC<ChartRowProps> = ({ chart }) => {
  const navigate = useNavigate();
  const { id, name, type, dataset, onDashboards, owners, lastModified } = chart;

  const handleNavigate = () => {
    navigate(`/edit-chart/${id}`);
  };

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    alert(`${action} chart "${name}"...`);
  };

  return (
    <div className="chart-row" onClick={handleNavigate}>
      <div className="chart-row-main">
        <Star className="star-icon" size={18} />
        <div className="name-container">
          <span className="chart-name">{name}</span>
        </div>
      </div>
      
      <div className="chart-row-details">
        <div className="chart-info" title="Chart Type">
          <BarChart2 size={16} className="info-icon" />
          <span>{type}</span>
        </div>
        
        <div className="chart-info" title="Dataset">
          <Database size={16} className="info-icon" />
          <span>{dataset}</span>
        </div>
        
        <div className="chart-info" title="Appearances on dashboards">
          <LayoutGrid size={16} className="info-icon" />
          <span>{onDashboards}</span>
        </div>

        <div className="chart-info" title="Owner">
          <User size={16} className="info-icon" />
          <span>{owners}</span>
        </div>
        
        <div className="chart-info time-info" title="Last modified">
          <Clock size={14} className="info-icon" />
          <span>{formatTimeAgo(lastModified)}</span>
        </div>
      </div>

      <div className="action-icons">
        <Trash2 className="action-icon delete" onClick={(e) => handleAction(e, 'Delete')} size={18} />
        <Upload className="action-icon export" onClick={(e) => handleAction(e, 'Export')} size={18} />
        <FilePenLine className="action-icon edit" onClick={(e) => handleAction(e, 'Edit')} size={18} />
      </div>
    </div>
  );
};

export default ChartRow;
