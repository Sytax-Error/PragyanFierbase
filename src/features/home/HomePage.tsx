import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart3,
  LayoutDashboard,
  Plus,
  ArrowRight,
  Clock,
  PieChart,
  Users,
  Activity,
  Eye,
  Download,
  Sparkles,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useTheme } from "@/hooks/theme/useTheme";
import {
  selectDashboards,
  type Dashboard,
} from "@/store/slices/dashboardSlice";
import { selectCharts, type Chart } from "@/store/slices/chartSlice";
import "./HomePage.css";

const statColors = [
  { primary: "#2563eb", bg: "rgba(37, 99, 235, 0.08)", trend: "positive" },
  { primary: "#059669", bg: "rgba(5, 150, 105, 0.08)" },
  { primary: "#d97706", bg: "rgba(217, 119, 6, 0.08)" },
  { primary: "#7c3aed", bg: "rgba(124, 58, 237, 0.08)" },
];

const quickLinks = [
  {
    icon: LayoutDashboard,
    label: "Dashboards",
    path: "/dashboards",
    color: "#2563eb",
  },
  { icon: BarChart3, label: "Charts", path: "/charts", color: "#059669" },
  { icon: FileText, label: "Datasets", path: "/datasets", color: "#d97706" },
  { icon: Users, label: "Team", path: "#", color: "#7c3aed" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dashboards = useSelector(selectDashboards);
  const charts = useSelector(selectCharts);

  const totalDashboards = dashboards.length;
  const totalCharts = charts.length;

  const recentlyModified: Dashboard[] = [...dashboards]
    .sort(
      (a, b) =>
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime(),
    )
    .slice(0, 5);

  const recentCharts: Chart[] = [...charts].slice(0, 4);

  const stats = [
    {
      label: "Dashboards",
      value: totalDashboards,
      icon: LayoutDashboard,
    },
    { label: "Charts", value: totalCharts, icon: BarChart3 },
    {
      label: "Users",
      value: 1,
      icon: Users,
    },
  ];

  // Build recent activity from real data
  type ActivityItem = {
    action: string;
    item: string;
    type: string;
    time: string;
    timeDisplay: string;
  };

  const recentActivityReal: ActivityItem[] = useMemo(() => {
    const now = Date.now();
    const fmt = (iso: string): string => {
      const diff = now - new Date(iso).getTime();
      const h = Math.floor(diff / 3600000);
      if (h < 1) return "Just now";
      if (h < 24) return `${h}h ago`;
      return `${Math.floor(h / 24)}d ago`;
    };
    const items: ActivityItem[] = [
      ...recentlyModified.slice(0, 3).map((d) => ({
        action: "Updated",
        item: d.name,
        type: "dashboard",
        time: d.lastModified,
        timeDisplay: fmt(d.lastModified),
      })),
      ...recentCharts.slice(0, 2).map((c) => ({
        action: "Modified",
        item: c.name,
        type: "chart",
        time: c.lastModified,
        timeDisplay: fmt(c.lastModified),
      })),
    ];
    return items
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- now is stable per render
  }, [recentlyModified, recentCharts]);

  return (
    <div className={`home-container ${theme === "dark" ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-bg-pattern" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Welcome back</span>
            </div>
            <h1>
              Your Analytics{" "}
              <span className="hero-gradient-text">Dashboard</span>
            </h1>
            <p>
              Track performance, discover insights, and make data-driven
              decisions
            </p>
          </div>
          <div className="hero-actions">
            <button className="hero-btn ghost">
              <Download size={16} />
              Export Report
            </button>
            <button
              className="hero-btn solid"
              onClick={() => navigate("/dashboards/add")}
            >
              <Plus size={16} />
              Create New
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const colors = statColors[i];
          return (
            <div
              key={stat.label}
              className="stat-card-stat"
              style={{ "--accent": colors.primary } as React.CSSProperties}
            >
              <div className="stat-stat-content">
                <div className="stat-icon-wrap">
                  <div
                    className="stat-icon"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.primary,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick Links */}
      <section className="home-quick-links">
        <div className="section-heading">
          <h2>Quick Access</h2>
        </div>
        <div className="quick-links-grid">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              className="quick-link-item"
              onClick={() => navigate(link.path)}
            >
              <div className="link-icon">
                <link.icon size={18} />
              </div>
              <span className="link-name">{link.label}</span>
              <ExternalLink size={14} className="link-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="home-content-grid">
        {/* Dashboards Table */}
        <div className="content-panel">
          <div className="panel-header">
            <div className="panel-title">
              <LayoutDashboard size={18} />
              <h3>Recent Dashboards</h3>
            </div>
            <button
              className="panel-action"
              onClick={() => navigate("/dashboards")}
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="panel-body">
            {recentlyModified.length > 0 ? (
              <div className="table-list">
                <div className="table-head">
                  <span className="col-name">Name</span>
                  <span className="col-owner">Owner</span>
                  <span className="col-time">Modified</span>
                  <span className="col-action" />
                </div>
                {recentlyModified.map((d) => (
                  <button
                    key={d.id}
                    className="table-item-row"
                    onClick={() => navigate(`/dashboards/${d.id}`)}
                  >
                    <div className="col-name">
                      <LayoutDashboard size={14} />
                      <span className="name-text">{d.name}</span>
                    </div>
                    <span className="col-owner">{d.owner}</span>
                    <span className="col-time">
                      <Clock size={12} />
                      {d.lastModified}
                    </span>
                    <div className="col-action">
                      <button className="row-icon-btn">
                        <Eye size={14} />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-panel">
                <LayoutDashboard size={36} />
                <h4>No dashboards yet</h4>
                <p>Create your first dashboard to get started</p>
                <button
                  className="empty-action-btn"
                  onClick={() => navigate("/dashboards/add")}
                >
                  <Plus size={14} />
                  Create Dashboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="content-panel">
          <div className="panel-header">
            <div className="panel-title">
              <PieChart size={18} />
              <h3>Recent Charts</h3>
            </div>
            <button
              className="panel-action"
              onClick={() => navigate("/charts")}
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="panel-body">
            {recentCharts.length > 0 ? (
              <div className="chart-preview-grid">
                {recentCharts.map((chart) => (
                  <button
                    key={chart.id}
                    className="chart-preview-item"
                    onClick={() => navigate("/charts")}
                  >
                    <div className="chart-icon-area">
                      <BarChart3 size={22} />
                    </div>
                    <div className="chart-details">
                      <span className="chart-title">{chart.name}</span>
                      <span className="chart-subtitle">{chart.chartType}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-panel">
                <BarChart3 size={36} />
                <h4>No charts yet</h4>
                <p>Create your first chart to visualize data</p>
                <button
                  className="empty-action-btn"
                  onClick={() => navigate("/add-chart")}
                >
                  <Plus size={14} />
                  Create Chart
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="home-activity">
        <div className="content-panel activity-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Activity size={18} />
              <h3>Recent Activity</h3>
            </div>
          </div>
          <div className="panel-body">
            <div className="activity-feed">
              {recentActivityReal.map((item, i: number) => (
                <div key={i} className="activity-entry">
                  <div className="activity-marker" />
                  <div className="activity-details">
                    <span className="activity-label">
                      {item.action}{" "}
                      <span className="activity-type">{item.type}</span>
                    </span>
                    <span className="activity-item-text">{item.item}</span>
                  </div>
                  <span className="activity-timestamp">{item.timeDisplay}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
