
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface ChartEditorState {
  isInitialized: boolean;
  datasetId: string | null;
  chartType: string | null;
  controls: Record<string, unknown>;
}

const initialState: ChartEditorState = {
  isInitialized: false,
  datasetId: null,
  chartType: null,
  controls: {},
};

const chartEditorSlice = createSlice({
  name: 'chartEditor',
  initialState,
  reducers: {
    setEditorState: (state, action: PayloadAction<Partial<ChartEditorState>>) => {
      // This allows updating multiple properties of the editor state at once
      Object.assign(state, action.payload);
      state.isInitialized = true;
    },
    resetEditor: () => {
      // Reset to the initial, uninitialized state
      return initialState;
    },
  },
});

export const { setEditorState, resetEditor } = chartEditorSlice.actions;

export const selectChartEditor = (state: RootState) => state.chartEditor;

export default chartEditorSlice.reducer;
