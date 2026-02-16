import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface Chart {
  id: string;
  name: string;
  type: string;
  dataset: string;
  onDashboards: string;
  tags: string;
  owners: string;
  lastModified: string;
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
      state.charts.push(action.payload);
    },
    // Add other chart-related reducers here
  },
});

export const { addChart } = chartsSlice.actions;

export const selectCharts = (state: RootState) => state.charts.charts;

export default chartsSlice.reducer;
