import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { vizRegistry } from '@/features/plugins/registry';
import type { VizPlugin } from '@/features/plugins/types';
import { runChart } from '@/features/chartEngine/runChart';
import { useTheme } from '@/hooks/theme/useTheme';
import { useDataset } from '@/hooks/data/useDataset';
import { StatusIndicator } from '@/components';
import EditChartSidebar from './components/EditChartSidebar';
import EditChartMain from './components/EditChartMain';
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

  const initialControls = useMemo(() => {
    if (!plugin) return {};
    const controls: Record<string, unknown> = {};
    plugin.controlPanel?.fields?.forEach((field) => {
      controls[field.key] = field.defaultValue;
    });
    return controls;
  }, [plugin]);

  const [userModifiedControls, setUserModifiedControls] = useState<Record<string, unknown>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserModifiedControls({});
  }, [plugin]);

  const controls = useMemo(() => ({
    ...initialControls,
    ...userModifiedControls,
  }), [initialControls, userModifiedControls]);

  const [ChartComponent, setChartComponent] = useState<React.ComponentType<unknown> | null>(null);
  const [chartProps, setChartProps] = useState<unknown>(null);

  const handleControlChange = (controlName: string, value: unknown) => {
    setUserModifiedControls(prevControls => ({
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

  return (
    <div className={`edit-chart-container ${theme}`}>
      <EditChartSidebar
        title={plugin.metadata.name as string}
        plugin={plugin}
        dataset={dataset}
        controls={controls}
        handleControlChange={handleControlChange}
        onCreateChart={handleCreateChart}
        isLoading={dataLoading}
      />
      <EditChartMain 
        dataLoading={dataLoading} 
        ChartComponent={ChartComponent} 
        chartProps={chartProps} 
      />
    </div>
  );
};

export default EditChartPage;