import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaChartBar } from 'react-icons/fa';
import { Button, ControlPanel } from '@/components';
import DynamicControl from '@/core/controls/DynamicControl';
import type { VizPlugin } from '@/features/plugins/types';
import type { Dataset } from '@/hooks/data/useDataset';
import './EditChartSidebar.css';
import { useSubHeader } from '@/hooks/subHeader/useSubHeader';

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
  const { setSubHeaderContent } = useSubHeader();

  useEffect(() => {
    setSubHeaderContent(
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <FaChartBar size="1.5rem" />
        <h1>Create Chart</h1>
      </div>
    );
  }, [setSubHeaderContent]);

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
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
      <div className="sidebar-content">
        <ControlPanel title={title}>
          {controlElements}
        </ControlPanel>
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
