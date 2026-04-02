import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart3,
  LayoutDashboard,
  Plus,
  ArrowRight,
  PieChart,
  Users,
  Activity,
  TrendingUp,
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
import ChartRow from "@/components/ChartRow/ChartRow";
import "./HomePage.css";

const statConfig = [
  {
    icon: LayoutDashboard,
    color: "var(--primary-light, #6E8EFB)",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    trend: "+2 this week",
  },
  {
    icon: BarChart3,
    color: "var(--accent-info, #17a2b8)",
    gradient: "linear-gradient(135deg, #16c79a 0%, #17a2b8 100%)",
    trend: "+5 this month",
  },
  {
    icon: Users,
    color: "var(--warning-color, #ffc107)",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    trend: "Active now",
  },
];

const quickLinks = [
  {
    icon: LayoutDashboard,
    label: "Dashboards",
    path: "/dashboards",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: BarChart3,
    label: "Charts",
    path: "/charts",
    gradient: "linear-gradient(135deg, #16c79a 0%, #17a2b8 100%)",
  },
  {
    icon: FileText,
    label: "Datasets",
    path: "/datasets",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  },
  {
    icon: Users,
    label: "Team",
    path: "#",
    gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useTheme(); // Ensure theme is loaded
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

  const recentCharts: Chart[] = [...charts].slice(0, 5);

  const stats = [
    {
      label: "Dashboards",
      value: totalDashboards,
      ...statConfig[0],
    },
    {
      label: "Charts",
      value: totalCharts,
      ...statConfig[1],
    },
    {
      label: "Users",
      value: 1,
      ...statConfig[2],
    },
  ];

  type ActivityItem = {
    action: string;
    item: string;
    type: string;
    time: string;
    timeDisplay: string;
    icon: typeof BarChart3;
  };

  const recentActivityReal: ActivityItem[] = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        icon: LayoutDashboard,
      })),
      ...recentCharts.slice(0, 2).map((c) => ({
        action: "Modified",
        item: c.name,
        type: "chart",
        time: c.lastModified,
        timeDisplay: fmt(c.lastModified),
        icon: BarChart3,
      })),
    ];
    return items
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 4);
  }, [recentlyModified, recentCharts]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-bg-pattern" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Analytics Dashboard</span>
            </div>
            <h1>
              Welcome to Your{" "}
              <span className="hero-gradient-text">Data Hub</span>
            </h1>
            <p>
              Track performance, discover insights, and make data-driven
              decisions with powerful visualizations
            </p>
          </div>
          <div className="hero-actions">
            <button
              className="hero-btn ghost"
              onClick={() => navigate("/datasets")}
            >
              <FileText size={16} />
              View Datasets
            </button>
            <button
              className="hero-btn solid"
              onClick={() => navigate("/dashboards/add")}
            >
              <Plus size={16} />
              Create Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="stat-card-stat"
              style={
                {
                  "--accent": stat.color,
                  "--stat-gradient": stat.gradient,
                } as React.CSSProperties
              }
            >
              <div className="stat-stat-content">
                <div className="stat-icon-wrap">
                  <div className="stat-icon">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
              <div className="stat-footer">
                <TrendingUp size={12} />
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </div>
          );
        })}
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
              <div className="data-list-container">
                {recentlyModified.map((d) => (
                  <ChartRow
                    key={d.id}
                    chart={
                      {
                        ...d,
                        type: "dashboard",
                        dataset: "N/A",
                      } as unknown as Chart
                    }
                  />
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
              <div className="data-list-container">
                {recentCharts.map((chart) => (
                  <ChartRow key={chart.id} chart={chart} />
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
              style={
                {
                  "--link-gradient": link.gradient,
                } as React.CSSProperties
              }
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
              {recentActivityReal.map((item, i: number) => {
                const ActivityIcon = item.icon;
                return (
                  <div key={i} className="activity-entry">
                    <div className="activity-marker" />
                    <div className="activity-icon">
                      <ActivityIcon size={16} />
                    </div>
                    <div className="activity-details">
                      <span className="activity-label">
                        {item.action}{" "}
                        <span className="activity-type">{item.type}</span>
                      </span>
                      <span className="activity-item-text">{item.item}</span>
                    </div>
                    <span className="activity-timestamp">
                      {item.timeDisplay}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
