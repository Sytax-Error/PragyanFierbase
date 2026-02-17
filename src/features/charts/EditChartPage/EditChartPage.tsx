import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vizRegistry } from '../../plugins/registry';
import { runChart } from '../../chartEngine/runChart';
import { useTheme } from '../../../hooks/theme/useTheme';
import { useDataset } from '../../../hooks/data/useDataset';
import StatusIndicator from '../../../components/StatusIndicator/StatusIndicator';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import ColorPicker from '../../../components/controls/ColorPicker/ColorPicker';
import Slider from '../../../components/controls/Slider/Slider';
import DataColumnSelector from '../../../components/controls/DataColumnSelector/DataColumnSelector';
import Button from '../../../components/Button/Button';
import type { RootState, AppDispatch } from '../../../store';
import './EditChartPage.css';

type Status = 'loading' | 'found' | 'not-found';

const EditChartPage: React.FC = () => {
  const params = useParams<{ datasetId: string; chartType: string }>();
  const { theme } = useTheme();
  const { dataset, data: currentDatasetData, loading: dataLoading, error } = useDataset(params.datasetId);

  const [ChartComponent, setChartComponent] = useState<React.ComponentType<any> | null>(null);
  const [chartProps, setChartProps] = useState<any>(null);
  const [controls, setControls] = useState<Record<string, any>>({});
  const [plugin, setPlugin] = useState<any | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (params.chartType) {
      const foundPlugin = vizRegistry.get(params.chartType);
      if (foundPlugin) {
        setPlugin(foundPlugin);
        const initialControls: Record<string, any> = {};
        foundPlugin.controlPanel?.fields?.forEach((field: any) => {
          initialControls[field.key] = field.defaultValue;
        });
        setControls(initialControls);
        setStatus('found');
      } else {
        setStatus('not-found');
      }
    }
  }, [params.chartType]);

  const handleControlChange = (controlName: string, value: any) => {
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
    plugin.controlPanel?.fields?.map((field: any) => {
      switch (field.type) {
        case 'data-column':
          return (
            <DataColumnSelector
              key={field.key}
              label={field.label}
              value={controls[field.key]}
              onChange={(value) => handleControlChange(field.key, value)}
              columns={getColumnsByKind(field.kind)}
            />
          );
        case 'color':
          return (
            <ColorPicker
              key={field.key}
              label={field.label}
              value={controls[field.key]}
              onChange={(value) => handleControlChange(field.key, value)}
            />
          );
        case 'slider':
          return (
            <Slider
              key={field.key}
              label={field.label}
              value={controls[field.key]}
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
                value={controls[field.key]}
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
        <ControlPanel title={plugin.metadata.name}>
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
          <ChartComponent {...chartProps} />
        ) : (
          <StatusIndicator status="info" message={'Configure your chart and click "Create Chart"'} />
        )}
      </div>
    </div>
  );
};

export default EditChartPage;
