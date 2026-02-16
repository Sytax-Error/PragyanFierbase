import React from 'react';
import './PluginCard.css';

const PluginCard = ({ plugin }) => (
  <div key={plugin.type} className="plugin-card">
    <div className="plugin-card-header">
      <h3>{plugin.metadata.name}</h3>
    </div>
    <div className="plugin-card-body">
      <p>{plugin.metadata.description}</p>
    </div>
  </div>
);

export default PluginCard;
