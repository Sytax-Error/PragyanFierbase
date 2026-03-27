import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LayoutGrid, List, Search } from 'lucide-react';
import { ChartCard, ChartRow } from '@/components';
import { selectCharts } from '@/store/slices/chartSlice';
import { useTheme } from '@/hooks/theme/useTheme';
import '@/features/charts/ChartsPage/ChartsPage.css';

const ChartsPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const charts = useSelector(selectCharts);
  const { theme } = useTheme();

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const filteredCharts = charts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.dataset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`charts-container ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="filter-section">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search charts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button onClick={toggleView} className={isGridView ? '' : 'active'}>
            <List size={20} />
          </button>
          <button onClick={toggleView} className={isGridView ? 'active' : ''}>
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {filteredCharts.length === 0 ? (
        <div className="empty-state">
          <h3>No charts found</h3>
          <p>Try adjusting your search or create a new chart.</p>
        </div>
      ) : isGridView ? (
        <div className="charts-grid">
          {filteredCharts.map((chart, index) => (
            <ChartCard key={chart.id} chart={chart} index={index} />
          ))}
        </div>
      ) : (
        <div className="charts-list">
          {filteredCharts.map((chart) => (
            <ChartRow key={chart.id} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartsPage;
