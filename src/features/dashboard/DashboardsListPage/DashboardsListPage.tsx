
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LayoutGrid, List } from 'lucide-react';
import { selectDashboards, type Dashboard } from '@/store/slices/dashboardSlice';
import './DashboardsListPage.css';
import DashboardCard from '@/components/DashboardCard/DashboardCard';
import DashboardRow from '@/components/DashboardRow/DashboardRow';

const DashboardsListPage: React.FC = () => {
  const dashboards = useSelector(selectDashboards);
  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="dashboards-container">
      <div className="filter-section">
        <div className="view-toggle">
          <button onClick={toggleView} className="active">
            {isGridView ? <List /> : <LayoutGrid />}
          </button>
        </div>
        <div className="filters">
          {/* Filters remain the same */}
        </div>
      </div>
      {isGridView ? (
        <div className="dashboards-grid">
          {dashboards.map((dashboard: Dashboard, index: number) => (
            <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
          ))}
        </div>
      ) : (
        <div className="dashboards-list">
          {dashboards.map((dashboard: Dashboard) => (
            <DashboardRow key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardsListPage;
