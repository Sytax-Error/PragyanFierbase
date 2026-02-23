import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '@/features/charts/ChartsPage/ChartsPage.css';
import { LayoutGrid, List } from 'lucide-react';
import { ChartCard, ChartRow } from '@/components';
import { selectCharts } from '@/store/slices/chartSlice';

const ChartsPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);
  const charts = useSelector(selectCharts);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="charts-container">
      <div className="filter-section">
        <div className="view-toggle">
          <button onClick={toggleView} className="active">
            {isGridView ? <List /> : <LayoutGrid />}
          </button>
        </div>
        <div className="filters">
          {/* Filters remain the same */}
        </div>
      </div>
      {isGridView ? (
        <div className="charts-grid">
          {charts.map((chart) => (
            <ChartCard key={chart.id} chart={chart} />
          ))}
        </div>
      ) : (
        <div className="charts-list">
          {charts.map((chart) => (
            <ChartRow key={chart.id} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartsPage;
