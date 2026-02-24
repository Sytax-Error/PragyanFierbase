
import React from 'react';
import { Link } from 'react-router-dom';
import './AddDashboardPage.css';

const AddDashboardPage: React.FC = () => {
  return (
    <div className="add-dashboard-page">
      <h2>Create a New Dashboard</h2>
      <p>Select a method to get started:</p>
      <div className="creation-options">
        <Link to="/dashboards/create" className="option-card">
          <h3>Start from Scratch</h3>
          <p>Build a new dashboard from the ground up.</p>
        </Link>
        <div className="option-card disabled">
          <h3>Use a Template (Coming Soon)</h3>
          <p>Get a head start with a pre-designed template.</p>
        </div>
      </div>
    </div>
  );
};

export default AddDashboardPage;
