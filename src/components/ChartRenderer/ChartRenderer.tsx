
import React from 'react';
import { useChartData } from '@/hooks/data/useChartData';
import { vizRegistry } from '@/core/visualization';
import { StatusIndicator } from '@/components';

interface ChartRendererProps {
  chartId: string;
  mode: 'dashboard' | 'explore';
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ chartId, mode }) => {
  const { loading, error, data, formData, pluginKey, name } = useChartData(chartId);

  if (loading) {
    return <StatusIndicator status="loading" message="Loading chart data..." />;
  }

  if (error) {
    return <StatusIndicator status="error" message={error} />;
  }

  if (!pluginKey || !formData || !data) {
    return <StatusIndicator status="not-found" message="Chart configuration is incomplete." />;
  }

  const plugin = vizRegistry.get(pluginKey);

  if (!plugin) {
    return <StatusIndicator status="not-found" message={`Chart plugin "${pluginKey}" not found.`} />;
  }

  const Component = plugin.Component as React.ComponentType<any>;
  const transformProps = plugin.transformProps;

  if (!Component || !transformProps) {
    return <StatusIndicator status="error" message="Chart plugin is not correctly configured." />;
  }

  // Add the mode to the controls/formData so it can be used by the plugin
  const finalFormData = {
    ...formData,
    headerText: name,
    mode, 
  };

  const chartProps = transformProps({
    dataset: data,
    controls: finalFormData,
  });

  return <Component {...chartProps} />;
};
