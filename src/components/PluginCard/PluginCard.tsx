import React from 'react';
import { Link } from 'react-router-dom';
import './PluginCard.css';

interface Plugin {
  type: string;
  metadata: {
    name: string;
    description: string;
    category: string;
  };
}

interface PluginCardProps {
  plugin: Plugin;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
  return (
    <Link to={`/charts/new?type=${plugin.type}`} className="plugin-card-link">
      <div className="plugin-card">
        <h3>{plugin.metadata.name}</h3>
        <p>{plugin.metadata.description}</p>
        <span className="category-tag">{plugin.metadata.category}</span>
      </div>
    </Link>
  );
};

export default PluginCard;
