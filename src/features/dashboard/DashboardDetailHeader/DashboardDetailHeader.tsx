import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { selectDashboards } from '@/store/slices/dashboardSlice';
import { Button } from '@/components';
import './DashboardDetailHeader.css';

const DashboardDetailHeader: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const navigate = useNavigate();
  const dashboards = useSelector(selectDashboards);
  const dashboard = dashboards.find(d => d.id === dashboardId);

  if (!dashboard) return null;

  return (
    <div className="dashboard-detail-header-wrapper">
      <div className="header-left">
        <button className="back-btn-header" onClick={() => navigate('/dashboards')}>
          <FiArrowLeft size={18} />
        </button>
        <span className="dashboard-name-header">{dashboard.name}</span>
      </div>
      <div className="header-right">
        <Button onClick={() => navigate(`/dashboards/edit/${dashboardId}`)} variant="secondary">
          <FiEdit size={14} />
          <span>Edit</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardDetailHeader;
