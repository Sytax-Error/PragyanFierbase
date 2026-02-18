import React from 'react';
import { StatusIndicator } from '@/components';
import './EditChartMain.css';

interface EditChartMainProps {
  dataLoading: boolean;
  ChartComponent: React.ComponentType<unknown> | null;
  chartProps: unknown;
}

const EditChartMain: React.FC<EditChartMainProps> = ({ 
  dataLoading, 
  ChartComponent, 
  chartProps 
}) => {
  return (
    <div className="edit-chart-main card">
      {dataLoading ? (
        <StatusIndicator status="loading" message="Fetching data..." />
      ) : ChartComponent ? (
        <ChartComponent {...chartProps as object} />
      ) : (
        <StatusIndicator status="info" message={'Configure your chart and click "Create Chart"'} />
      )}
    </div>
  );
};

export default EditChartMain;
