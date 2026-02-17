import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vizRegistry } from '../../plugins/registry';
import { runChart } from '../../chartEngine/runChart';
import { useTheme } from '../../../hooks/theme/useTheme';
import './EditChartPage.css';

type Status = 'loading' | 'found' | 'not-found';

const EditChartPage: React.FC = () => {
  const params = useParams<{ datasetId: string; chartType: string }>();
  const { theme } = useTheme();
  const [ChartComponent, setChartComponent] = useState<React.ComponentType<any> | null>(null);
  const [chartProps, setChartProps] = useState<any>(null);
  const [controls, setControls] = useState<Record<string, any>>({});
  const [plugin, setPlugin] = useState(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (params.chartType) {
      const foundPlugin = vizRegistry.get(params.chartType);
      if (foundPlugin) {
        setPlugin(foundPlugin);
        // Initialize controls with default values
        const initialControls: Record<string, any> = {};
        foundPlugin.controlPanel?.tabs?.forEach((tab: any) => {
          tab.sections.forEach((section: any) => {
            section.controls.forEach((control: any) => {
              initialControls[control.name] = control.defaultValue;
            });
          });
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
    return <div>Loading plugin...</div>;
  }

  if (status === 'not-found') {
    return <div>Plugin not found</div>;
  }

  if (!plugin) {
    return <div>Something went wrong</div>; // Should not happen
  }

  const controlElements =
    plugin.controlPanel?.tabs?.flatMap((tab: any) =>
      tab.sections.flatMap((section: any) =>
        section.controls.map((control: any) => {
          const ControlComponent = control.render;
          return (
            <div key={control.name} className="control-item">
              <label>{control.label}</label>
              <ControlComponent
                value={controls[control.name]}
                onChange={(value: any) => handleControlChange(control.name, value)}
              />
            </div>
          );
        })
      )
    ) || [];

  return (
    <div className={`edit-chart-container ${theme}`}>
      <div className="edit-chart-sidebar">
        <h2>{plugin.metadata.name}</h2>
        <div className="controls-panel">{controlElements}</div>
        <button onClick={handleCreateChart}>Create Chart</button>
      </div>
      <div className="edit-chart-main">
        {ChartComponent ? (
          <ChartComponent {...chartProps} />
        ) : (
          <div className="chart-placeholder">
            <p>Your chart will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditChartPage;
