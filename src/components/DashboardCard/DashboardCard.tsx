
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, User, Clock } from 'lucide-react';
import type { Dashboard } from '@/store/slices/dashboardSlice';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { generateModernColor } from '@/utils/colorUtils';

import './DashboardCard.css';

interface DashboardCardProps {
  dashboard: Dashboard;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard, index }) => {
  const { id, name, description, tags, charts, owner, lastModified } = dashboard;

  // Generate a modern, vibrant color with H, S, L values
  const accentColor = generateModernColor(name);

  const cardStyle = {
    '--accent-color-hsl': `${accentColor.h}, ${accentColor.s}%, ${accentColor.l}%`,
    '--accent-color': accentColor.hsl,
    '--animation-delay': `${index * 80}ms`, // Slightly faster stagger
  } as React.CSSProperties;

  return (
    <Link to={`/dashboards/${id}`} className="dashboard-card-link">
      <div className="dashboard-card" style={cardStyle}>
        <div className="card-glow" />
        <div className="card-border" />
        <div className="card-content">
          <div className="card-header">
            <h3>{name}</h3>
          </div>
          <div className="card-body">
            <p className="description">{description}</p>
            <div className="tags">
              {tags?.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="footer-meta">
              <div className="footer-item">
                <BarChart2 size={16} />
                <span>{charts.length} Charts</span>
              </div>
              <div className="footer-item">
                <User size={16} />
                <span>{owner}</span>
              </div>
            </div>
            <div className="footer-item">
              <Clock size={16} />
              <span>{formatTimeAgo(lastModified)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
