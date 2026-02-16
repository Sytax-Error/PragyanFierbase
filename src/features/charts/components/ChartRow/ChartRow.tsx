import React from 'react';
import { FaStar, FaTrash, FaUpload, FaEdit } from 'react-icons/fa';
import './ChartRow.css';

const ChartRow = ({ chart }) => (
    <div className="chart-row">
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
            <FaTrash />
            <FaUpload />
            <FaEdit />
        </div>
    </div>
);

export default ChartRow;
