
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/theme/useTheme';
import { Search, Plus, CheckCircle, Circle } from 'lucide-react';
import { CustomSelect, Button } from '@/components';
import { vizRegistry } from '@/core/visualization';
import { mockDatasets } from '@/data/mockDatasets'; // Import mockDatasets
import '@/features/charts/AddChartPage/AddChartPage.css';

const AddChartPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const chartPlugins = vizRegistry.list().map(plugin => ({
    id: plugin.type,
    name: plugin.metadata.name,
    thumbnail: plugin.metadata.thumbnail,
  }));

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

  const datasetOptions = mockDatasets.map(d => ({ value: d.id, label: d.name }));

  return (
    <div className={`add-chart-container ${theme}`}>
      <div className="add-chart-wizard">
        <aside className="wizard-sidebar">
          <div className="wizard-logo">
            <span className="logo-text">Chart Builder</span>
          </div>
          <nav className="wizard-nav">
            <div className={`wizard-nav-item ${isDatasetSelected ? 'completed' : 'active'}`}>
              <div className="nav-item-icon">
                {isDatasetSelected ? <CheckCircle /> : <Circle />}
              </div>
              <div className="nav-item-text">
                <h4>Step 1</h4>
                <p>Select Dataset</p>
              </div>
            </div>
            <div className={`wizard-nav-item ${isChartSelected ? 'completed' : (isDatasetSelected ? 'active' : '')}`}>
              <div className="nav-item-icon">
                {isChartSelected ? <CheckCircle /> : <Circle />}
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
                <Search className="search-icon" />
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
        <Button onClick={handleAddChart} disabled={!isChartSelected || !isDatasetSelected}>
          <Plus />
          Proceed to Edit
        </Button>
      </footer>
    </div>
  );
};

export default AddChartPage;
