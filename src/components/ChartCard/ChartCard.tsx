import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Upload, FilePenLine, BarChart, Database, LayoutGrid, Clock } from 'lucide-react';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import '@/components/ChartCard/ChartCard.css';
import { useDispatch } from 'react-redux';
import { removeChart } from '@/store/slices/chartSlice';
import type { Chart } from '@/store/slices/chartSlice';

interface ChartCardProps {
  chart: Chart;
  index: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ chart, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(`/charts/edit/${chart.id}`);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const action = (e.currentTarget as HTMLElement).dataset.action;
    alert(`${action} action for chart "${chart.name}"`);
  };

  const cardStyle = {
    '--animation-delay': `${index * 80}ms`,
  } as React.CSSProperties;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete chart "${chart.name}"?`)) {
      dispatch(removeChart(chart.id));
    }
  };

  return (
    <div className="chart-card" style={cardStyle} onClick={handleNavigate}>
      <div className="chart-card-header">
        <Star className="star-icon" size={18} />
        <h3 className="chart-name">{chart.name}</h3>
      </div>
      <div className="chart-card-body">
        <div className="chart-info">
          <BarChart size={16} className="info-icon" />
          <span>{chart.type}</span>
        </div>
        <div className="chart-info">
          <Database size={16} className="info-icon" />
          <span>{chart.dataset}</span>
        </div>
        {chart.onDashboards !== undefined && (
          <div className="chart-info">
            <LayoutGrid size={16} className="info-icon" />
            <span>{chart.onDashboards} Dashboards</span>
          </div>
        )}
      </div>
      <div className="chart-card-footer">
        <div className="footer-left">
          <span className="owner-initials">{chart.owners?.charAt(0) || 'U'}</span>
          <div className="time-meta">
            <Clock size={12} className="time-icon" />
            <span className="last-modified">{formatTimeAgo(chart.lastModified)}</span>
          </div>
        </div>
        <div className="action-icons">
          <Trash2 data-action="Delete" onClick={handleDelete} size={18} />
          <Upload data-action="Upload" onClick={handleIconClick} size={18} />
          <FilePenLine data-action="Edit" onClick={handleNavigate} size={18} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
