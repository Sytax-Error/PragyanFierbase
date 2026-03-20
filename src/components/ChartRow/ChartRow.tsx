
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Upload, FilePenLine, BarChart, Database, LayoutGrid } from 'lucide-react';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import '@/components/ChartRow/ChartRow.css';

import type { Chart } from '@/store/slices/chartSlice';

const ChartRow = ({ chart }: { chart: Chart }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/edit-chart/${chart.id}`);
    };

    // Stop propagation to prevent navigation when clicking on icons
    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Add specific logic for each icon click here
        const action = (e.currentTarget as HTMLElement).dataset.action;
        alert(`${action} action`);
    };

    return (
        <div className="chart-row" onClick={handleNavigate}>
            <div className="chart-row-main">
                <Star className="star-icon" />
                <span className="chart-name">{chart.name}</span>
            </div>
            <div className="chart-row-details">
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
                <span className="owner-initials">{chart.owners}</span>
                <span>{formatTimeAgo(chart.lastModified)}</span>
            </div>
            <div className="action-icons">
                <Trash2 data-action="Delete" onClick={handleIconClick} />
                <Upload data-action="Upload" onClick={handleIconClick} />
                <FilePenLine data-action="Edit" onClick={handleIconClick} />
            </div>
        </div>
    );
};

export default ChartRow;
