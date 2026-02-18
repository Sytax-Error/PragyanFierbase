import React from 'react';
import { Button, ControlPanel, DataColumnSelector, ColorPicker, Slider } from '@/components';
import type { VizPlugin } from '@/features/plugins/types';
import type { Dataset } from '@/hooks/data/useDataset';
import './EditChartSidebar.css';

interface EditChartSidebarProps {
  title: string;
  plugin: VizPlugin | null;
  dataset: Dataset | null;
  controls: Record<string, unknown>;
  handleControlChange: (controlName: string, value: unknown) => void;
  onCreateChart: () => void;
  isLoading: boolean;
}

const EditChartSidebar: React.FC<EditChartSidebarProps> = ({
  title,
  plugin,
  dataset,
  controls,
  handleControlChange,
  onCreateChart,
  isLoading,
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
    plugin?.controlPanel?.fields?.map((field: { key: string; label: string; type: string; kind: 'dimension' | 'measure'; config: Record<string, unknown>}) => {
      switch (field.type) {
        case 'data-column':
          return (
            <DataColumnSelector
              key={field.key}
              label={field.label}
              value={controls[field.key] as string}
              onChange={(value) => handleControlChange(field.key, value)}
              columns={getColumnsByKind(field.kind)}
            />
          );
        case 'color':
          return (
            <ColorPicker
              key={field.key}
              label={field.label}
              value={controls[field.key] as string}
              onChange={(value) => handleControlChange(field.key, value)}
            />
          );
        case 'slider':
          return (
            <Slider
              key={field.key}
              label={field.label}
              value={controls[field.key] as number}
              onChange={(value) => handleControlChange(field.key, value)}
              {...field.config}
            />
          );
        default:
          return (
            <div key={field.key} className="control-item">
              <label>{field.label}</label>
              <input
                type={field.type}
                value={controls[field.key] as string}
                onChange={(e) =>
                  handleControlChange(field.key, e.target.value)
                }
              />
            </div>
          );
      }
    }) || [];

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
