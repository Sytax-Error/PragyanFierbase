
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DashboardDetailPage.css';

interface ChartData {
  id: string;
  name: string;
  type: string;
  // The 'options' property is removed for now to avoid the highcharts dependency
}

interface DashboardData {
  id: string;
  name: string;
  charts: string[]; // Array of chart IDs
}

const DashboardDetailPage: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardsResponse = await fetch('/src/data/dashboards.json');
        const dashboards = await dashboardsResponse.json();
        const currentDashboard = dashboards.find((d: DashboardData) => d.id === dashboardId);

        if (currentDashboard) {
          setDashboard(currentDashboard);

          const chartsResponse = await fetch('/src/data/charts.json');
          const allCharts = await chartsResponse.json();
          
          const dashboardCharts = allCharts.filter((c: ChartData) => 
            currentDashboard.charts.includes(c.id)
          );
          setCharts(dashboardCharts);
        } else {
          console.error('Dashboard not found');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dashboardId]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!dashboard) {
    return <div>Dashboard not found.</div>;
  }

  return (
    <div className="dashboard-detail-page">
      <h2>{dashboard.name}</h2>
      <div className="charts-container">
        {charts.length > 0 ? (
          charts.map(chart => (
            <div key={chart.id} className="chart-widget">
              {/* Placeholder for the chart */}
              <div className="chart-placeholder">
                <h3>{chart.name}</h3>
                <p>({chart.type})</p>
                <p>Chart will be displayed here.</p>
              </div>
            </div>
          ))
        ) : (
          <p>This dashboard doesn't have any charts yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardDetailPage;
