import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload, FilePenLine, BarChart2, Clock } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import DataListRow from "@/components/DataListRow/DataListRow";

import type { Chart } from "@/store/slices/chartSlice";

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
      icon={<BarChart2 size={14} />}
      name={name}
      onClick={handleNavigate}
      details={[
        <span key="type">{type}</span>,
        <span key="dataset">{dataset}</span>,
        <div
          key="modified"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Clock size={12} />
          {formatTimeAgo(lastModified)}
        </div>,
      ]}
      actions={[
        <button
          key="export"
          className="data-list-row__action"
          onClick={(e) => handleAction(e, "Export")}
        >
          <Upload size={14} />
        </button>,
        <button
          key="edit"
          className="data-list-row__action"
          onClick={(e) => handleAction(e, "Edit")}
        >
          <FilePenLine size={14} />
        </button>,
        <button
          key="delete"
          className="data-list-row__action data-list-row__action--delete"
          onClick={(e) => handleAction(e, "Delete")}
        >
          <Trash2 size={14} />
        </button>,
      ]}
    />
  );
};

export default ChartRow;
