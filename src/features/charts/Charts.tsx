import React, { useState } from 'react';
import './Charts.css';
import { FaTh, FaList, FaStar, FaTrash, FaUpload, FaEdit, FaChartBar, FaTable, FaPlug } from 'react-icons/fa';

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

const ChartCard = ({ chart }) => (
  <div className="chart-card">
    <div className="chart-card-header">
      <FaStar className="star-icon" />
      <h3 className="chart-name">{chart.name}</h3>
    </div>
    <div className="chart-card-body">
      <div className="chart-info">
        <FaChartBar className="chart-info-icon" />
        <span>{chart.type}</span>
      </div>
      <div className="chart-info">
        <FaTable className="chart-info-icon" />
        <span>{chart.dataset}</span>
      </div>
      <div className="chart-info">
        <FaPlug className="chart-info-icon" />
        <span>{chart.onDashboards}</span>
      </div>
    </div>
    <div className="chart-card-footer">
      <span className="owner-initials">{chart.owners}</span>
      <span className="last-modified">{chart.lastModified}</span>
      <div className="action-icons">
        <FaTrash />
        <FaUpload />
        <FaEdit />
      </div>
    </div>
  </div>
);

const ChartRow = ({ chart }) => (
    <div className="chart-row">
        <div className="chart-row-main">
            <FaStar className="star-icon" />
            <span className="chart-name">{chart.name}</span>
        </div>
        <div className="chart-row-details">
            <span>{chart.type}</span>
            <span>{chart.dataset}</span>
            <span>{chart.onDashboards}</span>
            <span className="owner-initials">{chart.owners}</span>
            <span>{chart.lastModified}</span>
        </div>
        <div className="action-icons">
            <FaTrash />
            <FaUpload />
            <FaEdit />
        </div>
    </div>
);

const Charts: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h1>Charts</h1>
        <div className="charts-actions">
          <button className="bulk-select">Bulk select</button>
          <button className="add-chart">+ Chart</button>
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

export default Charts;
