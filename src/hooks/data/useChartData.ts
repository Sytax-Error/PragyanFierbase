
import { useSelector } from 'react-redux';
import { useDataset } from './useDataset';
import { type RootState } from '@/store';

export const useChartData = (chartId: string) => {
  const chart = useSelector((state: RootState) => 
    state.charts.charts.find(c => c.id === chartId)
  );

  const { data, loading, error } = useDataset(chart?.datasetId);

  if (!chart) {
    return {
      loading: false,
      error: `Chart with ID "${chartId}" not found.`,
      data: null,
      formData: null,
      pluginKey: null,
      name: null,
    };
  }

  return {
    loading,
    error,
    data,
    formData: chart.controls,
    pluginKey: chart.chartType,
    name: chart.name,
  };
};
