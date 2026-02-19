import React from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';
import { Button, ControlPanel } from '@/components';
import DynamicControl from '@/core/controls/DynamicControl';
import type { VizPlugin } from '@/core/visualization';
import type { Dataset } from '@/types';
import './EditChartSidebar.css';

interface EditChartSidebarProps {
  title: string;
  plugin: VizPlugin | null;
  dataset: Dataset | null;
  controls: Record<string, unknown>;
  handleControlChange: (controlName: string, value: unknown) => void;
  onCreateChart: () => void;
  isLoading: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
}

const EditChartSidebar: React.FC<EditChartSidebarProps> = ({
  title,
  plugin,
  dataset,
  controls,
  handleControlChange,
  onCreateChart,
  isLoading,
  isCollapsed,
  onToggle,
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

  const controlElements =
    plugin?.controlPanel?.fields?.map((field: { key: string; label: string; type: string; kind: 'dimension' | 'measure'; config: Record<string, unknown>}) => (
      <DynamicControl
        key={field.key}
        type={field.type}
        fieldKey={field.key}
        label={field.label}
        value={controls[field.key]}
        onChange={handleControlChange}
        options={getColumnsByKind(field.kind)}
        config={field.config}
      />
    )) || [];

  return (
    <div className={`edit-chart-sidebar card ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={onToggle}>
        <span className="desktop-icon">
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </span>
        <span className="mobile-icon">
          {isCollapsed ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-controls">
          <ControlPanel title={title}>
            {controlElements}
          </ControlPanel>
        </div>
        <div className="sidebar-footer">
          <Button className="create-chart-button" onClick={onCreateChart} disabled={isLoading}>
            {isLoading ? 'Loading Data...' : 'Create Chart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditChartSidebar;
