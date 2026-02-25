
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, BarChart2, User, Clock } from 'lucide-react';
import type { Dashboard } from '@/store/slices/dashboardSlice';
import './DashboardCard.css';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

interface DashboardCardProps {
  dashboard: Dashboard;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard }) => {
  const { id, name, description, tags, charts, owner, lastModified } = dashboard;
  return (
    <Link to={`/dashboards/${id}`} className="dashboard-card-link">
      <div className="dashboard-card">
        <div className="card-header">
          <h3>{name}</h3>
        </div>
        <div className="card-body">
          <p className="description">{description}</p>
          <div className="tags">
            <Tag size={16} />
            {tags?.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <div className="footer-item">
            <BarChart2 size={16} />
            <span>{charts.length} Charts</span>
          </div>
          <div className="footer-item">
            <User size={16} />
            <span>{owner}</span>
          </div>
          <div className="footer-item">
            <Clock size={16} />
            <span>{formatTimeAgo(lastModified)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
