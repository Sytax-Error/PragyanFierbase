import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardsListPage.css';

interface Dashboard {
  id: string;
  name: string;
  charts: string[];
}

const DashboardsListPage: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const data = await import('../../../data/dashboards.json');
        setDashboards(data.default);
      } catch (err) {
        console.error("Error fetching dashboards:", err);
        setError("Failed to load dashboards.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  if (loading) {
    return <div>Loading dashboards...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboards-list-page">
      <h2>Dashboards</h2>
      <div className="dashboards-grid">
        {dashboards.map(dashboard => (
          <Link to={`/dashboards/${dashboard.id}`} key={dashboard.id} className="dashboard-card">
            <h3>{dashboard.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardsListPage;
