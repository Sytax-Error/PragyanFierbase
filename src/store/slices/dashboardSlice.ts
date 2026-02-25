
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { mockDashboards } from '../../data/mockDashboards';

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  charts: string[];
  tags: string[];
  owner: string;
  lastModified: string;
}

interface DashboardsState {
  dashboards: Dashboard[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DashboardsState = {
  dashboards: mockDashboards,
  status: 'idle',
};

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    addDashboard: (state: { dashboards: unknown[]; }, action: PayloadAction<Dashboard>) => {
      state.dashboards.push(action.payload);
    },
    updateDashboard: (state: { dashboards: never[]; }, action: PayloadAction<{ id: string; changes: Partial<Dashboard> }>) => {
      const { id, changes } = action.payload;
      const existingDashboard = state.dashboards.find((dashboard: { id: unknown; }) => dashboard.id === id);
      if (existingDashboard) {
        Object.assign(existingDashboard, changes);
      }
    },
  },
});

export const { addDashboard, updateDashboard } = dashboardsSlice.actions;

export const selectDashboards = (state: RootState) => state.dashboards.dashboards;

export default dashboardsSlice.reducer;
