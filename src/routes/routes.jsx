import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/Dashboard';
import Charts from '../features/charts/Charts';
import Datasets from '../features/datasets/Datasets';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/charts" element={<MainLayout><Charts /></MainLayout>} />
        <Route path="/datasets" element={<MainLayout><Datasets /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
