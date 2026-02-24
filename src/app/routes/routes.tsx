
import MainLayout from "@/shared/layouts/MainLayout";
import DashboardsListPage from "@/features/dashboard/DashboardsListPage/DashboardsListPage";
import AddDashboardPage from "@/features/dashboard/AddDashboardPage/AddDashboardPage";
import CreateDashboardPage from "@/features/dashboard/CreateDashboardPage/CreateDashboardPage";
import EditDashboardPage from "@/features/dashboard/EditDashboardPage/EditDashboardPage";
import DashboardDetailPage from "@/features/dashboard/DashboardDetailPage/DashboardDetailPage";
import ChartsPage from "@/features/charts/ChartsPage/ChartsPage";
import AddChartPage from "@/features/charts/AddChartPage/AddChartPage";
import CreateChartPage from "@/features/charts/CreateChartPage/CreateChartPage";
import EditChartPage from "@/features/charts/EditChartPage/EditChartPage";
import DatasetTable from "@/features/datasets/DatasetTable.tsx";
import ChartsSubHeaderActions from "@/features/charts/ChartsPage/SubHeaderActions";
import DashboardsSubHeaderActions from "@/features/dashboard/SubHeaderActions/SubHeaderActions";
import EditChartSubHeaderActions from "@/features/charts/EditChartPage/components/SubHeaderActions";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardsListPage />,
        handle: {
          subHeader: <span className="text-xl font-semibold">Dashboards</span>,
        },
      },
      {
        path: "dashboards",
        element: <DashboardsListPage />,
        handle: {
          subHeader: (
            <>
              <span className="text-xl font-semibold">Dashboards</span>
              <DashboardsSubHeaderActions />
            </>
          ),
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
        path: "dashboards/create",
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
          subHeader: (
            <span className="text-xl font-semibold">Edit Dashboard</span>
          ),
        },
      },
      {
        path: "dashboards/:dashboardId",
        element: <DashboardDetailPage />,
        handle: {
          subHeader: (
            <span className="text-xl font-semibold">Dashboard Details</span>
          ),
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
