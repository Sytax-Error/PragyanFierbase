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

import './DashboardRow.css';

interface DashboardRowProps {
  dashboard: Dashboard;
}

const DashboardRow: React.FC<DashboardRowProps> = ({ dashboard }) => {
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

  return (
    <div className="dashboard-row" onClick={handleNavigate}>
      <div className="dashboard-row-main">
        <Star className="star-icon" size={18} />
        <div className="name-container">
          <span className="dashboard-name">{name}</span>
          {description && <span className="dashboard-description-mini">{description}</span>}
        </div>
      </div>
      
      <div className="dashboard-row-details">
        <div className="dashboard-info" title="Charts count">
          <BarChart2 size={16} className="info-icon" />
          <span>{charts?.length || 0}</span>
        </div>
        
        <div className="dashboard-info" title="Owner">
          <User size={16} className="info-icon" />
          <span>{owner}</span>
        </div>
        
        <div className="dashboard-info time-info" title="Last modified">
          <Clock size={14} className="info-icon" />
          <span>{formatTimeAgo(lastModified)}</span>
        </div>
      </div>

      <div className="action-icons">
        <Trash2 className="action-icon delete" onClick={handleDelete} size={18} />
        <Upload className="action-icon export" onClick={handleExport} size={18} />
        <FilePenLine className="action-icon edit" onClick={handleEdit} size={18} />
      </div>
    </div>
  );
};

export default DashboardRow;
