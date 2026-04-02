import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Trash2,
  Upload,
  FilePenLine,
  BarChart2,
  User,
  Clock,
} from "lucide-react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import DataListRow, {
  DataListTableHeader,
  type DataListColumn,
} from "@/components/DataListRow/DataListRow";
import "./DashboardRow.css";

import { useDispatch } from "react-redux";
import { removeDashboard, type Dashboard } from "@/store/slices/dashboardSlice";

export const dashboardColumns: DataListColumn[] = [
  { header: "Charts", key: "charts" },
  { header: "Owner", key: "owner" },
  { header: "Modified", key: "modified" },
];

interface DashboardRowProps {
  dashboard: Dashboard;
}

const DashboardRow: React.FC<DashboardRowProps> = ({ dashboard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, description, charts, owner, lastModified } = dashboard;

  const handleNavigate = () => {
    navigate(`/dashboards/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      window.confirm(`Are you sure you want to delete dashboard "${name}"?`)
    ) {
      dispatch(removeDashboard(id));
    }
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Exporting dashboard "${name}"...`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboards/edit/${id}`);
  };

  return (
    <DataListRow
      columns={dashboardColumns}
      icon={<Star className="star-icon" size={16} />}
      name={name}
      description={description}
      onClick={handleNavigate}
      details={[
        <div className="data-list-detail-item" key="charts">
          <BarChart2 size={14} className="icon" />
          <span>{charts?.length || 0}</span>
        </div>,
        <div className="data-list-detail-item" key="owner">
          <User size={14} className="icon" />
          <span>{owner}</span>
        </div>,
        <div className="data-list-detail-item" key="modified">
          <Clock size={14} className="icon" />
          <span>{lastModified ? formatTimeAgo(lastModified) : "N/A"}</span>
        </div>,
      ]}
      actions={[
        <button
          key="export"
          className="data-list-action-btn"
          onClick={handleExport}
          title="Export"
        >
          <Upload size={14} />
        </button>,
        <button
          key="edit"
          className="data-list-action-btn"
          onClick={handleEdit}
          title="Edit"
        >
          <FilePenLine size={14} />
        </button>,
        <button
          key="delete"
          className="data-list-action-btn data-list-action-btn--delete"
          onClick={handleDelete}
          title="Delete"
        >
          <Trash2 size={14} />
        </button>,
      ]}
    />
  );
};

export { DashboardRow, DataListTableHeader };
export default DashboardRow;
