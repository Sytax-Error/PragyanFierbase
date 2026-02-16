import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ChartsPage.css';
import { FaTh, FaList, FaUpload } from 'react-icons/fa';
import ChartCard from '../../../components/ChartCard/ChartCard';
import ChartRow from '../../../components/ChartRow/ChartRow';
import { addChart, selectCharts } from '../../../store/slices/chartSlice';

const chartsData = [
  {
    id: '1',
    name: 'Category - Amount Distributed(in Cr)',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    id: '2',
    name: 'Gender - Amount Distributed(in Cr)',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    id: '3',
    name: 'Category - Beneficiaries Distributions',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    id: '4',
    name: 'Gender - Beneficiaries Distribution',
    type: 'Drill Down',
    dataset: 'PM_Kisan_12Dec2025',
    onDashboards: 'PM-KISAN SAMMAN NIDHI API',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    id: '5',
    name: 'State - Ward Pending Applications',
    type: 'Table Hierarchy',
    dataset: 'pmmvy_urban_table',
    onDashboards: 'Pradhan Mantri Matru Vandana Yojana [Urban]',
    tags: '',
    owners: 'PA',
    lastModified: '4 days ago',
  },
  {
    id: '6',
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
  const dispatch = useDispatch();
  const charts = useSelector(selectCharts);

  useEffect(() => {
    if (charts.length === 0) {
      chartsData.forEach(chart => dispatch(addChart(chart)));
    }
  }, [charts.length, dispatch]);

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
          {charts.map((chart, index) => (
            <ChartCard key={index} chart={chart} />
          ))}
        </div>
      ) : (
        <div className="charts-list">
          {charts.map((chart, index) => (
            <ChartRow key={index} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartsPage;
