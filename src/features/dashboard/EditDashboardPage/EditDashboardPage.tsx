
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditDashboardPage.css';

interface Dashboard {
  id: string;
  name: string;
}

const EditDashboardPage: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [dashboardName, setDashboardName] = useState('');

  useEffect(() => {
    // In a real application, you would fetch the dashboard details from an API.
    // Here we'll just simulate it.
    fetch('/src/data/dashboards.json')
      .then(res => res.json())
      .then(dashboards => {
        const currentDashboard = dashboards.find((d: Dashboard) => d.id === dashboardId);
        if (currentDashboard) {
          setDashboard(currentDashboard);
          setDashboardName(currentDashboard.name);
        }
      });
  }, [dashboardId]);

  const handleUpdateDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashboardName.trim()) {
      alert('Please enter a name for the dashboard.');
      return;
    }
    console.log(`Updating dashboard ${dashboardId} with new name: ${dashboardName}`);
    alert(`Dashboard "${dashboardName}" updated successfully! (Simulation)`);
    navigate(`/dashboards`);
  };

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-dashboard-page">
      <h2>Edit Dashboard</h2>
      <form onSubmit={handleUpdateDashboard} className="dashboard-form">
        <div className="form-group">
          <label htmlFor="dashboardName">Dashboard Name</label>
          <input
            type="text"
            id="dashboardName"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditDashboardPage;
