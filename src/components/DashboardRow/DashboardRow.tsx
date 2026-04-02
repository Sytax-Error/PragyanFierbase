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
import { useDispatch } from "react-redux";
import { removeDashboard, type Dashboard } from "@/store/slices/dashboardSlice";
import DataListRow from "@/components/DataListRow/DataListRow";
import "./DashboardRow.css";

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
      icon={<Star className="star-icon" size={18} />}
      name={name}
      description={description}
      onClick={handleNavigate}
      details={[
        <div
          key="charts"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <BarChart2 size={16} className="info-icon" />
          <span>{charts?.length || 0}</span>
        </div>,
        <div
          key="owner"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <User size={16} className="info-icon" />
          <span>{owner}</span>
        </div>,
        <div
          key="modified"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Clock size={14} className="info-icon" />
          <span>{lastModified ? formatTimeAgo(lastModified) : "N/A"}</span>
        </div>,
      ]}
      actions={[
        <button
          key="export"
          className="data-list-row__action"
          onClick={handleExport}
        >
          <Upload size={14} />
        </button>,
        <button
          key="edit"
          className="data-list-row__action"
          onClick={handleEdit}
        >
          <FilePenLine size={14} />
        </button>,
        <button
          key="delete"
          className="data-list-row__action data-list-row__action--delete"
          onClick={handleDelete}
        >
          <Trash2 size={14} />
        </button>,
      ]}
    />
  );
};

export default DashboardRow;
