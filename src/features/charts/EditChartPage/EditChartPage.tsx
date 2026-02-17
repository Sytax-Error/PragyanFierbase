import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vizRegistry } from '../../plugins/registry';
import { runChart } from '../../chartEngine/runChart';
import { useTheme } from '../../../hooks/theme/useTheme';
import StatusIndicator from '../../../components/StatusIndicator/StatusIndicator';
import { VizPlugin } from '../../plugins/types';
import './EditChartPage.css';

type Status = 'loading' | 'found' | 'not-found';

const EditChartPage: React.FC = () => {
  const params = useParams<{ datasetId: string; chartType: string }>();
  const { theme } = useTheme();
  const [ChartComponent, setChartComponent] = useState<React.ComponentType<any> | null>(null);
  const [chartProps, setChartProps] = useState<any>(null);
  const [controls, setControls] = useState<Record<string, any>>({});
  const [plugin, setPlugin] = useState<VizPlugin | null>(null);
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
    if (params.datasetId && params.chartType && plugin) {
      const { Component, props } = await runChart({
        dataset: params.datasetId,
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

  if (!plugin) {
    return <StatusIndicator status="error" message="Something went wrong" />;
  }

  const controlElements =
    plugin.controlPanel?.fields?.map((field: any) => {
      return (
        <div key={field.key} className="control-item">
          <label>{field.label}</label>
          <input
            type={field.type}
            value={controls[field.key] ?? field.defaultValue}
            onChange={(e) =>
              handleControlChange(field.key, e.target.value)
            }
          />
        </div>
      );
    }) || [];

  return (
    <div className={`edit-chart-container ${theme}`}>
      <div className="edit-chart-sidebar card">
        <h2 className="chart-title">{plugin.metadata.name}</h2>
        <div className="controls-panel">{controlElements}</div>
        <button className="create-chart-button" onClick={handleCreateChart}>
          Create Chart
        </button>
      </div>
      <div className="edit-chart-main card">
        {ChartComponent ? (
          <ChartComponent {...chartProps} />
        ) : (
          <StatusIndicator status="info" message="Your chart will appear here" />
        )}
      </div>
    </div>
  );
};

export default EditChartPage;
