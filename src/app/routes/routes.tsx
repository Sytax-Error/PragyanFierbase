import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../shared/layouts/MainLayout';
import Dashboard from '../../features/dashboard/Dashboard';
import Charts from '../../features/charts/Charts';
import Datasets from '../../features/datasets/Datasets';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboards" element={<Dashboard />} />
        <Route path="charts" element={<Charts />} />
        <Route path="datasets" element={<Datasets />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
