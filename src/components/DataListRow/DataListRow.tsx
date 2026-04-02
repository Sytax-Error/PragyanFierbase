import React from "react";
import type { ReactNode } from "react";
import "./DataListRow.css";

interface DataListRowProps {
  /** Icon element to show in the name column */
  icon: ReactNode;
  /** Primary name/title text */
  name: string;
  /** Optional description text below name */
  description?: string;
  /** Array of detail columns */
  details: ReactNode[];
  /** Array of action buttons */
  actions: ReactNode[];
  /** Click handler for the row */
  onClick: () => void;
  /** Additional classes for the row */
  className?: string;
}

const DataListRow: React.FC<DataListRowProps> = ({
  icon,
  name,
  description,
  details,
  actions,
  onClick,
  className = "",
}) => {
  const gridStyle = {
    "--detail-columns": details.length,
  } as React.CSSProperties;

  return (
    <div
      className={`data-list-row ${className}`}
      style={gridStyle}
      onClick={onClick}
    >
      {/* Main column */}
      <div className="data-list-row--main">
        <span className="data-list-row__icon">{icon}</span>
        <div className="name-container">
          <span className="data-list-row__name">{name}</span>
          {description && (
            <span className="data-list-row__description">{description}</span>
          )}
        </div>
      </div>

      {/* Details columns - each detail is a direct grid cell */}
      {details.map((detail, index) => (
        <div key={index} className="data-list-row__detail-col">
          {detail}
        </div>
      ))}

      {/* Actions */}
      <div className="data-list-row__actions">
        {actions.map((action, index) => (
          <span key={index} className="data-list-row__action-wrapper">
            {action}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DataListRow;
