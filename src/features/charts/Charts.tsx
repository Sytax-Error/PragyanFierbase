import React from 'react';
import './Charts.css';
import { FaFileMedical, FaThList, FaStar, FaTrash, FaUpload, FaEdit } from 'react-icons/fa';

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

const Charts: React.FC = () => {
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
          <button><FaThList /></button>
          <button className="active"><FaFileMedical /></button>
        </div>
        <div className="filters">
          <div className="filter-item">
            <label>Name</label>
            <input type="text" placeholder="Type a value" />
          </div>
          <div className="filter-item">
            <label>Type</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Dataset</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Tag</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Owner</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className_name="filter-item">
            <label>Dashboard</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Favorite</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Certified</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Modified by</label>
            <select>
              <option>Select or type a value</option>
            </select>
          </div>
        </div>
      </div>
      <div className="charts-table-container">
        <table className="charts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Dataset</th>
              <th>On dashboards</th>
              <th>Tags</th>
              <th>Owners</th>
              <th>Last modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chartsData.map((chart, index) => (
              <tr key={index}>
                <td><FaStar className="star-icon" /> {chart.name}</td>
                <td>{chart.type}</td>
                <td>{chart.dataset}</td>
                <td>{chart.onDashboards}</td>
                <td>{chart.tags}</td>
                <td><span className="owner-initials">{chart.owners}</span></td>
                <td>{chart.lastModified}</td>
                <td className="action-icons">
                  <FaTrash />
                  <FaUpload />
                  <FaEdit />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Charts;
