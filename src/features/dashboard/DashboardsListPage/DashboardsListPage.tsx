import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LayoutGrid, List, Search } from "lucide-react";
import {
  selectDashboards,
  type Dashboard,
} from "@/store/slices/dashboardSlice";
import { useTheme } from "@/hooks/theme/useTheme";
import { DataListTableHeader } from "@/components/DataListRow/DataListRow";
import { dashboardColumns } from "@/components/DashboardRow/DashboardRow";
import "./DashboardsListPage.css";
import DashboardCard from "@/components/DashboardCard/DashboardCard";
import DashboardRow from "@/components/DashboardRow/DashboardRow";

const DashboardsListPage: React.FC = () => {
  const dashboards = useSelector(selectDashboards);
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const filteredDashboards = dashboards.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={`dashboards-container ${theme === "dark" ? "dark" : ""}`}>
      <div className="filter-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search dashboards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button onClick={toggleView} className={isGridView ? "" : "active"}>
            <List size={20} />
          </button>
          <button onClick={toggleView} className={isGridView ? "active" : ""}>
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {filteredDashboards.length === 0 ? (
        <div className="empty-state">
          <h3>No dashboards found</h3>
          <p>Try adjusting your search or create a new dashboard.</p>
        </div>
      ) : isGridView ? (
        <div className="dashboards-grid">
          {filteredDashboards.map((dashboard: Dashboard, index: number) => (
            <DashboardCard
              key={dashboard.id}
              dashboard={dashboard}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="dashboards-list">
          <DataListTableHeader columns={dashboardColumns} />
          {filteredDashboards.map((dashboard: Dashboard) => (
            <DashboardRow key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardsListPage;
