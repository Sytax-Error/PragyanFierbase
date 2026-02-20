import React from 'react';
import { FaHome, FaChartBar, FaPlus } from 'react-icons/fa';
import MainLayout from '@/shared/layouts/MainLayout';
import Dashboard from '@/features/dashboard/Dashboard';
import ChartsPage from '@/features/charts/ChartsPage/ChartsPage';
import AddChartPage from '@/features/charts/AddChartPage/AddChartPage';
import EditChartPage from '@/features/charts/EditChartPage/EditChartPage';
import DatasetTable from '@/features/datasets/DatasetTable.tsx';
import SubHeaderActions from '@/features/charts/ChartsPage/SubHeaderActions';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: {
          subHeader: (
            <div className="flex flex-row items-center gap-2">
              <FaHome />
              <span className="text-xl font-semibold">Dashboards</span>
            </div>
          ),
        },
      },
      {
        path: 'dashboards',
        element: <Dashboard />,
        handle: {
          subHeader: (
            <div className="flex flex-row items-center gap-2">
              <FaHome />
              <span className="text-xl font-semibold">Dashboards</span>
            </div>
          ),
        },
      },
      {
        path: 'charts',
        element: <ChartsPage />,
        handle: {
          subHeader: (
            <>
              <div className="flex flex-row items-center gap-2">
                <FaChartBar />
                <span className="text-xl font-semibold">Charts</span>
              </div>
              <SubHeaderActions />
            </>
          ),
        },
      },
      {
        path: 'add-chart',
        element: <AddChartPage />,
        handle: {
          subHeader: (
            <div className="flex flex-row items-center gap-2">
              <FaPlus />
              <span className="text-xl font-semibold">Add New Chart</span>
            </div>
          ),
        },
      },
      {
        path: 'edit-chart/:datasetId/:chartType',
        element: <EditChartPage />,
        handle: {
          subHeader: (
            <div className="flex flex-row items-center gap-2">
              <FaChartBar />
              <span className="text-xl font-semibold">Edit Chart</span>
            </div>
          ),
        },
      },
      {
        path: 'datasets',
        element: <DatasetTable />,
        handle: { subHeader: <span className="text-xl font-semibold">Datasets</span> },
      },
    ],
  },
];

export default routes;
