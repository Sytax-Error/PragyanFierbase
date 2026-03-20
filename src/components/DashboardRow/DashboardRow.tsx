import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, User, Clock } from 'lucide-react';
import type { Dashboard } from '@/store/slices/dashboardSlice';
import './DashboardRow.css';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

interface DashboardRowProps {
  dashboard: Dashboard;
}

// This component is now restructured with a 5-column layout in mind.
const DashboardRow: React.FC<DashboardRowProps> = ({ dashboard }) => {
  const { id, name, description, tags, charts, owner, lastModified } = dashboard;

  return (
    <Link to={`/dashboards/${id}`} className="dashboard-row-link">
      <div className="dashboard-row">
        {/* Column 1: Name and Description */}
        <div className="dashboard-cell name-cell">
          <h3 className="dashboard-name">{name}</h3>
          <p className="dashboard-description">{description}</p>
        </div>

        {/* Column 2: Tags */}
        <div className="dashboard-cell tags-cell">
          {tags?.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Column 3: Chart Count */}
        <div className="dashboard-cell chart-cell">
          <BarChart2 size={16} />
          <span>{charts.length}</span>
        </div>

        {/* Column 4: Owner */}
        <div className="dashboard-cell owner-cell">
          <User size={16} />
          <span>{owner}</span>
        </div>

        {/* Column 5: Last Modified */}
        <div className="dashboard-cell modified-cell">
          <Clock size={16} />
          <span>{formatTimeAgo(lastModified)}</span>
        </div>
      </div>
    </Link>
  );
};

export default DashboardRow;
