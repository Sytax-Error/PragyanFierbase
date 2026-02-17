import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/theme/useTheme';
import { useSubHeader } from '../../../hooks/subHeader/useSubHeader';
import { FiSearch, FiPlus, FiBarChart2, FiPieChart, FiTrendingUp, FiCheckCircle, FiCircle, FiLayers, FiCompass } from 'react-icons/fi';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import './AddChartPage.css';

const chartPlugins = [
  { id: 'bar', name: 'Bar Chart', icon: <FiBarChart2 /> },
  { id: 'pie', name: 'Pie Chart', icon: <FiPieChart /> },
  { id: 'line', name: 'Line Chart', icon: <FiTrendingUp /> },
  { id: 'area', name: 'Area Chart', icon: <FiLayers /> },
  { id: 'scatter', name: 'Scatter Plot', icon: <FiTrendingUp /> },
  { id: 'radar', name: 'Radar Chart', icon: <FiCompass /> },
];

const datasets = [
  { value: 'sales_data', label: 'Sales Data' },
  { value: 'user_analytics', label: 'User Analytics' },
];

const AddChartPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setSubHeaderContent } = useSubHeader();

  useEffect(() => {
    setSubHeaderContent(<><h1>Add New Chart</h1></>);
  }, [setSubHeaderContent]);

  const handleAddChart = () => {
    if (selectedChart && selectedDataset) {
      navigate(`/dashboard/add-chart-success?dataset=${selectedDataset}&chart=${selectedChart}`);
    }
  };

  const filteredCharts = chartPlugins.filter(chart =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDatasetSelected = !!selectedDataset;
  const isChartSelected = !!selectedChart;

  return (
    <div className={`add-chart-container ${theme}`}>
      <div className="add-chart-wizard">
        <aside className="wizard-sidebar">
          <div className="wizard-logo">
            <FiBarChart2 />
            <span className="logo-text">Chart Builder</span>
          </div>
          <nav className="wizard-nav">
            <div className={`wizard-nav-item ${isDatasetSelected ? 'completed' : 'active'}`}>
              <div className="nav-item-icon">
                {isDatasetSelected ? <FiCheckCircle /> : <FiCircle />}
              </div>
              <div className="nav-item-text">
                <h4>Step 1</h4>
                <p>Select Dataset</p>
              </div>
            </div>
            <div className={`wizard-nav-item ${isChartSelected ? 'completed' : (isDatasetSelected ? 'active' : '')}`}>
              <div className="nav-item-icon">
                {isChartSelected ? <FiCheckCircle /> : <FiCircle />}
              </div>
              <div className="nav-item-text">
                <h4>Step 2</h4>
                <p>Choose Chart</p>
              </div>
            </div>
          </nav>
          <div className="wizard-footer">
            <p>Select your data and chart type to proceed.</p>
          </div>
        </aside>

        <main className="wizard-content">
          <div className="wizard-step" id="step-1">
            <h2 className="wizard-step-title">Select a Dataset</h2>
            <p className="wizard-step-subtitle">Choose the data source you want to visualize.</p>
            <CustomSelect
              options={datasets}
              value={selectedDataset}
              onChange={setSelectedDataset}
              placeholder="Choose a dataset..."
            />
          </div>

          <div className="wizard-step" id="step-2">
            <div className="chart-gallery-header">
              <div>
                <h2 className="wizard-step-title">Choose a Chart Type</h2>
                <p className="wizard-step-subtitle">Pick a visualization that best represents your data.</p>
              </div>
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
        </main>
      </div>

      <footer className="add-chart-footer-bar">
        <button onClick={handleAddChart} disabled={!isChartSelected || !isDatasetSelected}>
          <FiPlus />
          Add Chart to Dashboard
        </button>
      </footer>
    </div>
  );
};

export default AddChartPage;
