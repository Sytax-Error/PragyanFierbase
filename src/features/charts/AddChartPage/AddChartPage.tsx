import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { addChart } from '../../../store/slices/chartSlice';
import { useSubHeader } from '../../../hooks/subHeader/useSubHeader';
import './AddChartPage.css';

// Mock data for datasets and chart plugins
const datasets = [
  { id: '1', name: 'PM_Kisan_12Dec2025' },
  { id: '2', name: 'PMMVY_Urban_Table' },
  { id: '3', name: 'Sales_Data_2023' },
];

const chartPlugins = [
  { id: 'big-number-quarters', name: 'Big Number (Quarters)', thumbnail: '/path/to/big-number-quarters.png' },
  { id: 'bignumber-category', name: 'Bignumber (Category)', thumbnail: '/path/to/bignumber-category.png' },
  { id: 'bignumber-line-bar', name: 'Bignumber (Line/Bar)', thumbnail: '/path/to/bignumber-line-bar.png' },
  { id: 'custom-pie', name: 'Custom Pie', thumbnail: '/path/to/custom-pie.png' },
  { id: 'drill-down', name: 'Drill Down', thumbnail: '/path/to/drill-down.png' },
  { id: 'india-map-hierarchy', name: 'India Map Hierarchy', thumbnail: '/path/to/india-map-hierarchy.png' },
  { id: 'multi-charts', name: 'Multi Charts', thumbnail: '/path/to/multi-charts.png' },
  { id: 'table-hierarchy', name: 'Table Hierarchy', thumbnail: '/path/to/table-hierarchy.png' },
];

const AddChartPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSubHeaderContent } = useSubHeader();

  const handleCreateChart = () => {
    if (selectedDataset && selectedChartType) {
      const newChart = {
        id: Date.now().toString(),
        name: `${selectedChartType} of ${selectedDataset}`,
        type: selectedChartType,
        dataset: selectedDataset,
        onDashboards: '',
        tags: '',
        owners: 'PA',
        lastModified: 'Now',
      };
      dispatch(addChart(newChart));
      navigate('/charts');
    }
  };

  useEffect(() => {
    setSubHeaderContent(
      <>
        <h1>Create a new chart</h1>
      </>
    );

    return () => {
      setSubHeaderContent(null);
    };
  }, [setSubHeaderContent]);

  return (
    <div className="add-chart-page-container">
      <main className="add-chart-main">
        <div className="chart-creation-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h2>Choose a dataset</h2>
              <div className="dataset-selection">
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                >
                  <option value="" disabled>Choose a dataset</option>
                  {datasets.map((dataset) => (
                    <option key={dataset.id} value={dataset.name}>
                      {dataset.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h2>Choose chart type</h2>
              <div className="chart-gallery-container">
                <div className="chart-gallery-header">
                  <div className="search-bar">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search all charts"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="chart-gallery">
                  {chartPlugins
                    .filter((plugin) =>
                      plugin.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((plugin) => (
                      <div
                        key={plugin.id}
                        className={`chart-plugin-card ${selectedChartType === plugin.name ? 'selected' : ''}`}
                        onClick={() => setSelectedChartType(plugin.name)}
                      >
                        <div className="chart-thumbnail"></div>
                        <p>{plugin.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="add-chart-footer">
        <p>Please select both a Dataset and a Chart type to proceed</p>
        <button
          onClick={handleCreateChart}
          disabled={!selectedDataset || !selectedChartType}
        >
          Create new chart
        </button>
      </div>
    </div>
  );
};

export default AddChartPage;
