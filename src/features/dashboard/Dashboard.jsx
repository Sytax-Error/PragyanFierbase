import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { sampleData } from '../../data/sampleData';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <BarChart
        width={600}
        height={300}
        data={sampleData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
