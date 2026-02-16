import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChartsPage.css';
import { FaTh, FaList, FaUpload } from 'react-icons/fa';
import ChartCard from '../../components/ChartCard/ChartCard';
import ChartRow from '../../components/ChartRow/ChartRow';

const chartsData = [
  {
    name: 'Category - Amount Distributed(in Cr)',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    name: 'Gender - Amount Distributed(in Cr)',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    name: 'Category - Beneficiaries Distributions',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    name: 'Gender - Beneficiaries Distribution',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    name: 'State - Ward Pending Applications',
    type: 'Table Hierarchy',
    dataset: 'pmmvy_urban_table',
    onDashboards: 'Pradhan Mantri Matru Vandana Yojana [Urban]',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    name: 'Extent of District Coverage (%)',
    type: 'Drill Down',
    dataset: 'PM-KISAN_SAMMAN_NIDHI_10thFEB',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '5 days ago',
  },
];

const ChartsPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleAddChartClick = () => {
    navigate('/add-chart');
  };

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h1>Charts</h1>
        <div className="charts-actions">
          <button className="bulk-select">Bulk select</button>
          <button className="add-chart" onClick={handleAddChartClick}>+ Chart</button>
          <button className="download-chart">
            <FaUpload />
          </button>
        </div>
      </div>
      <div className="filter-section">
        <div className="view-toggle">
          <button onClick={toggleView} className="active">
            {isGridView ? <FaList /> : <FaTh />}
          </button>
        </div>
        <div className="filters">
          {/* Filters remain the same */}
        </div>
      </div>
      {isGridView ? (
        <div className="charts-grid">
          {chartsData.map((chart, index) => (
            <ChartCard key={index} chart={chart} />
          ))}
        </div>
      ) : (
        <div className="charts-list">
          {chartsData.map((chart, index) => (
            <ChartRow key={index} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartsPage;
