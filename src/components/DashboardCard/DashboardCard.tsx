import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Trash2, 
  Upload, 
  FilePenLine, 
  BarChart2, 
  User, 
  Clock 
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeDashboard, type Dashboard } from '@/store/slices/dashboardSlice';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

import './DashboardCard.css';

interface DashboardCardProps {
  dashboard: Dashboard;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, description, charts, owner, lastModified } = dashboard;

  const handleNavigate = () => {
    navigate(`/dashboards/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete dashboard "${name}"?`)) {
      dispatch(removeDashboard(id));
    }
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Exporting dashboard "${name}"...`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboards/edit/${id}`);
  };

  const cardStyle = {
    '--animation-delay': `${index * 80}ms`,
  } as React.CSSProperties;

  return (
    <div className="dashboard-card" style={cardStyle} onClick={handleNavigate}>
      <div className="dashboard-card-header">
        <Star className="star-icon" size={18} />
        <h3 className="dashboard-name">{name}</h3>
      </div>
      <div className="dashboard-card-body">
        {description && <p className="description">{description}</p>}
        <div className="dashboard-info">
          <BarChart2 size={16} className="info-icon" />
          <span>{charts?.length || 0} Charts</span>
        </div>
        <div className="dashboard-info">
          <User size={16} className="info-icon" />
          <span>{owner}</span>
        </div>
      </div>
      <div className="dashboard-card-footer">
        <div className="footer-left">
          <Clock size={14} className="time-icon" />
          <span className="last-modified">{formatTimeAgo(lastModified)}</span>
        </div>
        <div className="action-icons">
          <Trash2 onClick={handleDelete} size={18} />
          <Upload onClick={handleExport} size={18} />
          <FilePenLine onClick={handleEdit} size={18} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
