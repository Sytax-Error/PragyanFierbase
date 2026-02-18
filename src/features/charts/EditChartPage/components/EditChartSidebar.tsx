import React from 'react';
import { Button, ControlPanel } from '@/components';
import './EditChartSidebar.css';

interface EditChartSidebarProps {
  title: string;
  controlElements: React.ReactNode;
  onCreateChart: () => void;
  isLoading: boolean;
}

const EditChartSidebar: React.FC<EditChartSidebarProps> = ({
  title,
  controlElements,
  onCreateChart,
  isLoading,
}) => {
  return (
    <div className="edit-chart-sidebar card">
      <ControlPanel title={title}>
        {controlElements}
      </ControlPanel>
      <Button className="create-chart-button" onClick={onCreateChart} disabled={isLoading}>
        {isLoading ? 'Loading Data...' : 'Create Chart'}
      </Button>
    </div>
  );
};

export default EditChartSidebar;
