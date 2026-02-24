
import MainLayout from "@/shared/layouts/MainLayout";
import Dashboard from "@/features/dashboard/Dashboard";
import ChartsPage from "@/features/charts/ChartsPage/ChartsPage";
import AddChartPage from "@/features/charts/AddChartPage/AddChartPage";
import EditChartPage from "@/features/charts/EditChartPage/EditChartPage";
import DatasetTable from "@/features/datasets/DatasetTable.tsx";
import SubHeaderActions from "@/features/charts/ChartsPage/SubHeaderActions";
import EditChartSubHeaderActions from "@/features/charts/EditChartPage/components/SubHeaderActions";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: {
          subHeader: <span className="text-xl font-semibold">Dashboards</span>,
        },
      },
      {
        path: "dashboards",
        element: <Dashboard />,
        handle: {
          subHeader: <span className="text-xl font-semibold">Dashboards</span>,
        },
      },
      {
        path: "charts",
        element: <ChartsPage />,
        handle: {
          subHeader: (
            <>
              <span className="text-xl font-semibold">Charts</span>
              <SubHeaderActions />
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
        path: "edit-chart/:datasetId/:chartType",
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
        path: "edit-chart/:chartId",
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
