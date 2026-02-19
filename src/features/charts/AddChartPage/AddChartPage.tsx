import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/theme/useTheme';
import { useSubHeader } from '@/hooks/subHeader/useSubHeader';
import { FiSearch, FiPlus, FiCheckCircle, FiCircle, FiImage } from 'react-icons/fi';
import { CustomSelect } from '@/components';
import { vizRegistry } from '@/features/plugins/registry';
import { mockDatasets } from '@/data/mockDatasets'; // Import mockDatasets
import '@/features/charts/AddChartPage/AddChartPage.css';

const AddChartPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setSubHeaderContent } = useSubHeader();

  const chartPlugins = vizRegistry.list().map(plugin => ({
    id: plugin.type,
    name: plugin.metadata.name,
    icon: plugin.metadata.icon, // Keep the component reference
    thumbnail: plugin.metadata.thumbnail,
  }));

  useEffect(() => {
    setSubHeaderContent(<><h1>Add New Chart</h1></>);
  }, [setSubHeaderContent]);

  const handleAddChart = () => {
    if (selectedChart && selectedDataset) {
      navigate(`/edit-chart/${selectedDataset}/${selectedChart}`);
    }
  };

  const filteredCharts = chartPlugins.filter(chart =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDatasetSelected = !!selectedDataset;
  const isChartSelected = !!selectedChart;

  // Correctly get the icon component for the logo
  const LogoIcon = chartPlugins[0]?.icon || FiCircle;

  const datasetOptions = mockDatasets.map(d => ({ value: d.id, label: d.name }));

  return (
    <div className={`add-chart-container ${theme}`}>
      <div className="add-chart-wizard">
        <aside className="wizard-sidebar">
          <div className="wizard-logo">
            <LogoIcon size="1.5rem" />
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
              options={datasetOptions}
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
              {filteredCharts.map(chart => {
                return (
                  <div
                    key={chart.id}
                    className={`chart-plugin-card ${selectedChart === chart.id ? 'selected' : ''}`}
                    onClick={() => setSelectedChart(chart.id)}
                  >
                    <div className="chart-thumbnail">
                      <img src={chart.thumbnail} alt={chart.name} />
                    </div>
                    <h3>{chart.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <footer className="add-chart-footer-bar">
        <button onClick={handleAddChart} disabled={!isChartSelected || !isDatasetSelected}>
          <FiPlus />
          Proceed to Edit
        </button>
      </footer>
    </div>
  );
};

export default AddChartPage;
