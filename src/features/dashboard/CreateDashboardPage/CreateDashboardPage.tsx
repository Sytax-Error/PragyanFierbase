
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateDashboardPage.css';

const CreateDashboardPage: React.FC = () => {
  const [dashboardName, setDashboardName] = useState('');
  const navigate = useNavigate();

  const handleCreateDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashboardName.trim()) {
      alert('Please enter a name for the dashboard.');
      return;
    }
    // In a real application, you would make an API call to create the dashboard.
    // Here we'll just simulate it and navigate to the new dashboard's page.
    const newDashboardId = `db-${Date.now()}`;
    console.log(`Creating dashboard: ${dashboardName} with id: ${newDashboardId}`);
    alert(`Dashboard "${dashboardName}" created successfully! (Simulation)`);
    navigate(`/dashboards`);
  };

  return (
    <div className="create-dashboard-page">
      <h2>Name Your New Dashboard</h2>
      <form onSubmit={handleCreateDashboard} className="dashboard-form">
        <div className="form-group">
          <label htmlFor="dashboardName">Dashboard Name</label>
          <input
            type="text"
            id="dashboardName"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            placeholder="e.g., 'My Awesome Dashboard'"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Dashboard</button>
      </form>
    </div>
  );
};

export default CreateDashboardPage;
