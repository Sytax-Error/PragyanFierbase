import React from "react";
import type { ReactNode } from "react";
import "./DataListRow.css";

export interface DataListColumn {
  header: string;
  key: string;
}

interface DataListRowProps {
  /** Columns for the table header */
  columns: DataListColumn[];
  /** Icon element to show in the name column */
  icon: ReactNode;
  /** Primary name/title text */
  name: string;
  /** Optional description text below name */
  description?: string;
  /** Array of detail values matching columns */
  details: ReactNode[];
  /** Array of action buttons */
  actions: ReactNode[];
  /** Click handler for the row */
  onClick: () => void;
  /** Additional classes for the row */
  className?: string;
}

export const DataListTableHeader: React.FC<{ columns: DataListColumn[] }> = ({
  columns,
}) => {
  return (
    <div className="data-list-table-header">
      <div className="data-list-table-col">Name</div>
      {columns.map((col) => (
        <div
          key={col.key}
          className="data-list-table-col data-list-table-col--center"
        >
          {col.header}
        </div>
      ))}
      <div className="data-list-table-col data-list-table-col--right">
        Actions
      </div>
    </div>
  );
};

const DataListRow: React.FC<DataListRowProps> = ({
  icon,
  name,
  description,
  details,
  actions,
  onClick,
  className = "",
}) => {
  return (
    <div className={`data-list-table-row ${className}`} onClick={onClick}>
      {/* Main column */}
      <div className="data-list-table-col">
        <div className="data-list-table-row-main">
          <span className="data-list-row__icon">{icon}</span>
          <div className="name-container">
            <span className="data-list-row__name">{name}</span>
            {description && (
              <span className="data-list-row__description">{description}</span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      {details.map((detail, index) => (
        <div
          key={index}
          className="data-list-table-col data-list-table-col--center"
        >
          {detail}
        </div>
      ))}

      {/* Actions */}
      <div className="data-list-table-col data-list-table-col--right">
        {actions.map((action, index) => (
          <span key={index}>{action}</span>
        ))}
      </div>
    </div>
  );
};

export default DataListRow;
