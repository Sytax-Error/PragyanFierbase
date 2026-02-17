import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaTrash, FaUpload, FaEdit } from 'react-icons/fa';
import './ChartRow.css';

const ChartRow = ({ chart }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/edit-chart/${chart.dataset}/${chart.type}`);
    };

    return (
        <div className="chart-row" onClick={handleNavigate}>
            <div className="chart-row-main">
                <FaStar className="star-icon" />
                <span className="chart-name">{chart.name}</span>
            </div>
            <div className="chart-row-details">
                <span>{chart.type}</span>
                <span>{chart.dataset}</span>
                <span>{chart.onDashboards}</span>
                <span className="owner-initials">{chart.owners}</span>
                <span>{chart.lastModified}</span>
            </div>
            <div className="action-icons">
                <FaTrash onClick={(e) => { e.stopPropagation(); alert('Delete action'); }} />
                <FaUpload onClick={(e) => { e.stopPropagation(); alert('Upload action'); }} />
                <FaEdit />
            </div>
        </div>
    );
};

export default ChartRow;
