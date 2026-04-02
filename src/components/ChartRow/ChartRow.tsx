import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload, FilePenLine, BarChart2, Clock } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import DataListRow, {
  type DataListColumn,
} from "@/components/DataListRow/DataListRow";

import type { Chart } from "@/store/slices/chartSlice";

export const chartColumns: DataListColumn[] = [
  { header: "Type", key: "type" },
  { header: "Dataset", key: "dataset" },
  { header: "Modified", key: "modified" },
];

interface ChartRowProps {
  chart: Chart;
}

const ChartRow: React.FC<ChartRowProps> = ({ chart }) => {
  const navigate = useNavigate();
  const { id, name, type, dataset, lastModified } = chart;

  const handleNavigate = () => {
    navigate(`/edit-chart/${id}`);
  };

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    alert(`${action} chart "${name}"...`);
  };

  return (
    <DataListRow
      columns={chartColumns}
      icon={<BarChart2 size={16} />}
      name={name}
      onClick={handleNavigate}
      details={[
        <div className="data-list-detail-item" key="type">
          <span>{type}</span>
        </div>,
        <div className="data-list-detail-item" key="dataset">
          <span>{dataset}</span>
        </div>,
        <div className="data-list-detail-item" key="modified">
          <Clock size={14} className="icon" />
          <span>{formatTimeAgo(lastModified)}</span>
        </div>,
      ]}
      actions={[
        <button
          key="export"
          className="data-list-action-btn"
          onClick={(e) => handleAction(e, "Export")}
          title="Export"
        >
          <Upload size={14} />
        </button>,
        <button
          key="edit"
          className="data-list-action-btn"
          onClick={(e) => handleAction(e, "Edit")}
          title="Edit"
        >
          <FilePenLine size={14} />
        </button>,
        <button
          key="delete"
          className="data-list-action-btn data-list-action-btn--delete"
          onClick={(e) => handleAction(e, "Delete")}
          title="Delete"
        >
          <Trash2 size={14} />
        </button>,
      ]}
    />
  );
};

export default ChartRow;
