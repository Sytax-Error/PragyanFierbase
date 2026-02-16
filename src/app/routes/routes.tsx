import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../shared/layouts/MainLayout';
import Dashboard from '../../features/dashboard/Dashboard';
import ChartsPage from '../../features/charts/pages/ChartsPage/ChartsPage';
import AddChartPage from '../../features/charts/pages/AddChartPage/AddChartPage';
import DatasetTable from '../../features/datasets/DatasetTable.tsx'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboards" element={<Dashboard />} />
        <Route path="charts" element={<ChartsPage />} />
        <Route path="add-chart" element={<AddChartPage />} />
        <Route path="datasets" element={<DatasetTable />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
