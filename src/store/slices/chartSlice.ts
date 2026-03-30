
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Chart {
  id: string;
  name: string;
  type: string;
  dataset: string;
  datasetId: string;
  chartType: string;
  onDashboards: string;
  tags: string;
  owners: string;
  lastModified: string;
  controls?: Record<string, unknown> | undefined;
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
    // Reducer for adding a new chart
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
    },
    removeChart: (state, action: PayloadAction<string>) => {
      state.charts = state.charts.filter((d) => d.id !== action.payload);
    },
    // Reducer for updating an existing chart
    updateChart: (state, action: PayloadAction<{ id: string; changes: Partial<Chart> }>) => {
      const { id, changes } = action.payload;
      const existingChart = state.charts.find(chart => chart.id === id);
      if (existingChart) {
        // Apply the changes to the existing chart
        Object.assign(existingChart, changes);
      }
    },
  },
});

// Export the actions
export const { addChart, removeChart, updateChart } = chartsSlice.actions;

// Selector to get all charts
export const selectCharts = (state: RootState) => state.charts.charts;

export default chartsSlice.reducer;
