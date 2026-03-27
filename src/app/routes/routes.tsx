import { Navigate } from "react-router-dom";
import MainLayout from "@/shared/layouts/MainLayout";
import DashboardsListPage from "@/features/dashboard/DashboardsListPage/DashboardsListPage";
import AddDashboardPage from "@/features/dashboard/AddDashboardPage/AddDashboardPage";
import CreateDashboardPage from "@/features/dashboard/CreateDashboardPage/CreateDashboardPage";
import EditDashboardPage from "@/features/dashboard/EditDashboardPage/EditDashboardPage";
import DashboardEditHeader from "@/features/dashboard/DashboardEditHeader/DashboardEditHeader";
import DashboardDetailPage from "@/features/dashboard/DashboardDetailPage/DashboardDetailPage";
import DashboardDetailHeader from "@/features/dashboard/DashboardDetailHeader/DashboardDetailHeader";
import ChartsPage from "@/features/charts/ChartsPage/ChartsPage";
import AddChartPage from "@/features/charts/AddChartPage/AddChartPage";
import CreateChartPage from "@/features/charts/CreateChartPage/CreateChartPage";
import EditChartPage from "@/features/charts/EditChartPage/EditChartPage";
import DatasetTable from "@/features/datasets/DatasetTable";
import ChartsSubHeaderActions from "@/features/charts/ChartsPage/SubHeaderActions";
import EditChartSubHeaderActions from "@/features/charts/EditChartPage/components/SubHeaderActions";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboards" replace />,
      },
      {
        path: "dashboards",
        element: <DashboardsListPage />,
        handle: {
          subHeader: <span className="text-xl font-semibold">Dashboards</span>,
        },
      },
      {
        path: "dashboards/add",
        element: <AddDashboardPage />,
        handle: {
          subHeader: (
            <span className="text-xl font-semibold">Add New Dashboard</span>
          ),
        },
      },
      {
        path: "dashboards/create/:templateId",
        element: <CreateDashboardPage />,
        handle: {
          subHeader: (
            <span className="text-xl font-semibold">Create Dashboard</span>
          ),
        },
      },
      {
        path: "dashboards/edit/:dashboardId",
        element: <EditDashboardPage />,
        handle: {
          subHeader: <DashboardEditHeader />,
        },
      },
      {
        path: "dashboards/:dashboardId",
        element: <DashboardDetailPage />,
        handle: {
          subHeader: <DashboardDetailHeader />,
        },
      },
      {
        path: "charts",
        element: <ChartsPage />,
        handle: {
          subHeader: (
            <>
              <span className="text-xl font-semibold">Charts</span>
              <ChartsSubHeaderActions />
            </>
          ),
        },
      },
      {
        path: "add-chart",
        element: <AddChartPage />,
        handle: {
          subHeader: (
            <span className="text-xl font-semibold">Add New Chart</span>
          ),
        },
      },
      {
        path: "charts/create/:datasetId/:chartType",
        element: <CreateChartPage />,
        handle: {
          subHeader: (
            <>
              <span className="text-xl font-semibold">Create Chart</span>
              <EditChartSubHeaderActions />
            </>
          ),
        },
      },
      {
        path: "charts/edit/:chartId",
        element: <EditChartPage />,
        handle: {
          subHeader: (
            <>
              <span className="text-xl font-semibold">Edit Chart</span>
              <EditChartSubHeaderActions />
            </>
          ),
        },
      },
      {
        path: "datasets",
        element: <DatasetTable />,
        handle: {
          subHeader: <span className="text-xl font-semibold">Datasets</span>,
        },
      },
    ],
  },
];

export default routes;
