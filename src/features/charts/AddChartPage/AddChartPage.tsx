import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/theme/useTheme';
import { FiSearch, FiPlus, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import './AddChartPage.css';

const chartPlugins = [
  { id: 'bar', name: 'Bar Chart', icon: <FiBarChart2 /> },
  { id: 'pie', name: 'Pie Chart', icon: <FiPieChart /> },
  { id: 'line', name: 'Line Chart', icon: <FiTrendingUp /> },
  { id: 'area', name: 'Area Chart', icon: <FiBarChart2 /> }, // Example, replace with specific icon
  { id: 'scatter', name: 'Scatter Plot', icon: <FiTrendingUp /> }, // Example, replace with specific icon
  { id: 'radar', name: 'Radar Chart', icon: <FiPieChart /> }, // Example, replace with specific icon
];

const AddChartPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleAddChart = () => {
    if (selectedChart && selectedDataset) {
      navigate(`/dashboard/add-chart-success?dataset=${selectedDataset}&chart=${selectedChart}`);
    }
  };

  const filteredCharts = chartPlugins.filter(chart =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`add-chart-page-container ${theme}`}>
      <div className="add-chart-content-wrapper">
        <main className="add-chart-main">
          <div className="chart-creation-steps">
            {/* Step 1: Select Dataset (Fixed Height) */}
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h2>Select a Dataset</h2>
                <div className="dataset-selection">
                  <select onChange={(e) => setSelectedDataset(e.target.value)} value={selectedDataset}>
                    <option value="" disabled>Choose a dataset...</option>
                    <option value="sales_data">Sales Data</option>
                    <option value="user_analytics">User Analytics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Chart (Flexible Height with Internal Scroll) */}
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="chart-gallery-header">
                  <h2>Choose a Chart Type</h2>
                  <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search charts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="chart-gallery">
                  {filteredCharts.map(chart => (
                    <div
                      key={chart.id}
                      className={`chart-plugin-card ${selectedChart === chart.id ? 'selected' : ''}`}
                      onClick={() => setSelectedChart(chart.id)}
                    >
                      <div className="chart-thumbnail">{chart.icon}</div>
                      <h3>{chart.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="add-chart-footer">
        <div className="footer-content">
          <button onClick={handleAddChart} disabled={!selectedChart || !selectedDataset}>
            <FiPlus />
            Add Chart to Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AddChartPage;
