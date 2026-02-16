import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatasets } from '../../store/slices/datasetSlice';
import type { AppDispatch, RootState } from '../../store';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { datasets, loading, error } = useSelector((state: RootState) => state.datasets);

  useEffect(() => {
    console.log('Dashboard: useEffect triggered. Dispatching fetchDatasets...');
    dispatch(fetchDatasets());
  }, [dispatch]);

  if (loading) {
    return <div className="dashboard-container"><p>Loading datasets...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Datasets</h2>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>{dataset.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
