
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Chart {
  id: string;
  name: string;
  type: string;
  dataset: string;
  datasetId: string,
  chartType: string,
  onDashboards: string;
  tags: string;
  owners: string;
  lastModified: string;
  controls?: Record<string, unknown> | undefined; // Optional property to store chart-specific controls
}

interface ChartsState {
  charts: Chart[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ChartsState = {
  charts: [],
  status: 'idle',
};

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Chart>) => {
      const newChart = action.payload;
      // Remove any existing chart with the same ID to handle updates
      const updatedCharts = state.charts.filter(chart => chart.id !== newChart.id);
      // Add the new or updated chart
      updatedCharts.push(newChart);
      state.charts = updatedCharts;
    },
    // Add other chart-related reducers here
  },
});

export const { addChart } = chartsSlice.actions;

export const selectCharts = (state: RootState) => state.charts.charts;

export default chartsSlice.reducer;
