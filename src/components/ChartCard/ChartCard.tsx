
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Upload, FilePenLine, BarChart, Database, LayoutGrid } from 'lucide-react';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import '@/components/ChartCard/ChartCard.css';

const ChartCard = ({ chart }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/edit-chart/${chart.dataset}/${chart.type}`);
  };

  // Stop propagation to prevent navigation when clicking on icons
  const handleIconClick = (e) => {
    e.stopPropagation();
    // Add specific logic for each icon click here
    alert(`${e.currentTarget.dataset.action} action`);
  };

  return (
    <div className="chart-card" onClick={handleNavigate}>
      <div className="chart-card-header">
        <Star className="star-icon" />
        <h3 className="chart-name">{chart.name}</h3>
      </div>
      <div className="chart-card-body">
        <div className="chart-info">
          <BarChart className="chart-info-icon" />
          <span>{chart.type}</span>
        </div>
        <div className="chart-info">
          <Database className="chart-info-icon" />
          <span>{chart.dataset}</span>
        </div>
        <div className="chart-info">
          <LayoutGrid className="chart-info-icon" />
          <span>{chart.onDashboards}</span>
        </div>
      </div>
      <div className="chart-card-footer">
        <span className="owner-initials">{chart.owners}</span>
        <span className="last-modified">{formatTimeAgo(chart.lastModified)}</span>
        <div className="action-icons">
          <Trash2 data-action="Delete" onClick={handleIconClick} />
          <Upload data-action="Upload" onClick={handleIconClick} />
          <FilePenLine data-action="Edit" onClick={handleIconClick} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
