import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  charts: string[];
  layouts?: { [key: string]: any[] };
  tags: string[];
  owner: string;
  lastModified: string;
}

interface DashboardsState {
  dashboards: Dashboard[];
  activeEditor: Dashboard | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DashboardsState = {
  dashboards: [],
  activeEditor: null,
  status: 'idle',
};

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    addDashboard: (state, action: PayloadAction<Dashboard>) => {
      state.dashboards.push(action.payload);
    },
    updateDashboard: (state, action: PayloadAction<{ id: string; changes: Partial<Dashboard> }>) => {
      const { id, changes } = action.payload;
      const dashboard = state.dashboards.find((d) => d.id === id);
      if (dashboard) {
        Object.assign(dashboard, changes);
      }
    },
    removeDashboard: (state, action: PayloadAction<string>) => {
      state.dashboards = state.dashboards.filter((d) => d.id !== action.payload);
    },
    setActiveEditor: (state, action: PayloadAction<Dashboard | null>) => {
      state.activeEditor = action.payload;
    },
    updateActiveEditor: (state, action: PayloadAction<Partial<Dashboard>>) => {
      if (state.activeEditor) {
        state.activeEditor = { ...state.activeEditor, ...action.payload };
      }
    },
  },
});

export const { 
  addDashboard, 
  updateDashboard, 
  removeDashboard, 
  setActiveEditor, 
  updateActiveEditor 
} = dashboardsSlice.actions;

export const selectDashboards = (state: RootState) => state.dashboards.dashboards;
export const selectActiveEditor = (state: RootState) => state.dashboards.activeEditor;

export default dashboardsSlice.reducer;
