import React from 'react';
import { useNavigate } from 'react-router-dom';
import { vizRegistry } from '../../../plugins/registry';
import PluginCard from '../../components/PluginCard/PluginCard';
import './AddChartPage.css';

const AddChartPage: React.FC = () => {
  const navigate = useNavigate();
  const plugins = vizRegistry.list();

  return (
    <div className="add-chart-container">
      <div className="add-chart-header">
        <h1>Add Chart</h1>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
      <div className="plugin-grid">
        {plugins.map(plugin => (
          <PluginCard key={plugin.type} plugin={plugin} />
        ))}
      </div>
    </div>
  );
};

export default AddChartPage;
