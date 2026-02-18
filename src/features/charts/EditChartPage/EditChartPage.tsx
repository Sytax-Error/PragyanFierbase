import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { vizRegistry } from '@/features/plugins/registry';
import type { VizPlugin } from '@/features/plugins/types';
import { runChart } from '@/features/chartEngine/runChart';
import { useTheme } from '@/hooks/theme/useTheme';
import { useDataset } from '@/hooks/data/useDataset';
import { StatusIndicator, ControlPanel, Button, ColorPicker, Slider, DataColumnSelector } from '@/components';
import '@/features/charts/EditChartPage/EditChartPage.css';

type Status = 'loading' | 'found' | 'not-found';

const EditChartPage: React.FC = () => {
  const params = useParams<{ datasetId: string; chartType: string }>();
  const { theme } = useTheme();
  const { dataset, data: currentDatasetData, loading: dataLoading } = useDataset(params.datasetId);

  const chartType = params.chartType;
  const plugin: VizPlugin | null = useMemo(() => (chartType ? vizRegistry.get(chartType) : null), [chartType]);
  const status: Status = useMemo(() => {
    if (!chartType) return 'loading';
    return plugin ? 'found' : 'not-found';
  }, [chartType, plugin]);

  const [ChartComponent, setChartComponent] = useState<React.ComponentType<unknown> | null>(null);
  const [chartProps, setChartProps] = useState<unknown>(null);
  const [controls, setControls] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (plugin) {
      const initialControls: Record<string, unknown> = {};
      plugin.controlPanel?.fields?.forEach((field: { key: string; defaultValue: unknown; }) => {
        initialControls[field.key] = field.defaultValue;
      });
      setControls(initialControls);
    } else {
      setControls({});
    }
  }, [plugin]);

  const handleControlChange = (controlName: string, value: unknown) => {
    setControls(prevControls => ({
      ...prevControls,
      [controlName]: value,
    }));
  };

  const handleCreateChart = async () => {
    if (currentDatasetData && params.chartType && plugin) {
      const { Component, props } = await runChart({
        dataset: currentDatasetData,
        chartType: params.chartType,
        controls,
      });
      setChartComponent(() => Component);
      setChartProps(props);
    }
  };

  if (status === 'loading') {
    return <StatusIndicator status="loading" message="Loading plugin..." />;
  }

  if (status === 'not-found') {
    return <StatusIndicator status="not-found" message={`Plugin "${params.chartType}" not found.`} />;
  }

  if (!plugin || !dataset) {
    return <StatusIndicator status="error" message="Something went wrong" />;
  }

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
    plugin.controlPanel?.fields?.map((field: { key: string; label: string; type: string; kind: 'dimension' | 'measure'; config: Record<string, unknown>}) => {
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
    <div className={`edit-chart-container ${theme}`}>
      <div className="edit-chart-sidebar card">
        <ControlPanel title={plugin.metadata.name as string}>
          {controlElements}
        </ControlPanel>
        <Button className="create-chart-button" onClick={handleCreateChart} disabled={dataLoading}>
          {dataLoading ? 'Loading Data...' : 'Create Chart'}
        </Button>
      </div>
      <div className="edit-chart-main card">
        {dataLoading ? (
          <StatusIndicator status="loading" message="Fetching data..." />
        ) : ChartComponent ? (
          <ChartComponent {...chartProps as object} />
        ) : (
          <StatusIndicator status="info" message={'Configure your chart and click "Create Chart"'} />
        )}
      </div>
    </div>
  );
};

export default EditChartPage;
