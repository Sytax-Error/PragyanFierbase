
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import type { VizPlugin } from '@/core/visualization';
import type { Dataset } from '@/types/dataset';
import { ControlPanel, Button } from '@/components';
import DynamicControl from '@/core/controls/DynamicControl';
import './EditChartSidebar.css';

interface EditChartSidebarProps {
  plugin: VizPlugin;
  dataset: Dataset;
  title: string;
  controls: Record<string, unknown>;
  handleControlChange: (controlName: string, value: unknown) => void;
  onCreateChart: () => void;
  isLoading: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  isCreationDisabled: boolean;
}

const EditChartSidebar: React.FC<EditChartSidebarProps> = ({ 
  plugin, 
  dataset, 
  title, 
  controls, 
  handleControlChange, 
  onCreateChart, 
  isLoading,
  isCollapsed,
  onToggle,
  isCreationDisabled
}) => {

  const getColumnsByKind = (kind: 'dimension' | 'measure') => {
    if (!dataset) return [];
    if (kind === 'dimension') {
      return dataset.columns.filter(c => c.type === 'string').map(c => c.name);
    }
    if (kind === 'measure') {
      return dataset.columns.filter(c => c.type === 'number' || c.type === 'integer').map(c => c.name);
    }
    return dataset.columns.map(c => c.name);
  };

  const controlElements = plugin?.controlPanel?.fields?.map((field) => {
    const options = field.kind ? getColumnsByKind(field.kind) : [];
    return (
      <DynamicControl
        key={field.key}
        type={field.type}
        fieldKey={field.key}
        label={field.label}
        value={controls[field.key]}
        onChange={handleControlChange}
        options={options}
        config={field.config as Record<string, unknown>}
      />
    );
  }) || [];

  return (
    <div className={`edit-chart-sidebar card ${isCollapsed ? 'collapsed' : ''}`}>
       <div className="sidebar-toggle" onClick={onToggle}>
         <span className="desktop-icon">
           {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
         </span>
         <span className="mobile-icon">
           {isCollapsed ? <ChevronUp /> : <ChevronDown />}
         </span>
       </div>
      <div className="sidebar-content">
        <div className="sidebar-controls">
          <ControlPanel title={title}>
            {controlElements}
          </ControlPanel>
        </div>
        <div className="sidebar-footer">
          <Button onClick={onCreateChart} disabled={isLoading || isCreationDisabled}>
            {isLoading ? 'Loading Data...' : 'Create Chart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditChartSidebar;
