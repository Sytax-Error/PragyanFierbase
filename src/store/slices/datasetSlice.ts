import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Dataset } from '@/types/dataset';
import * as datasetService from '@/services/api/dataset.service';

type DataRecord = Record<string, unknown>;

// 1. Defines the "shape" of this slice's state
interface DatasetState {
  datasets: Dataset[]; // List of all datasets
  currentDataset: Dataset | null; // The currently selected dataset object
  currentDatasetData: DataRecord[] | null; // Data for the currently selected dataset
  loading: boolean; // Loading for the list of datasets
  dataLoading: boolean; // Loading for the specific dataset data
  error: string | null;
}

// 2. Sets the initial state when the app first loads
const initialState: DatasetState = {
  datasets: [],
  currentDataset: null,
  currentDatasetData: null,
  loading: false,
  dataLoading: false,
  error: null,
};

// 3. Async Thunk for fetching the list of datasets
export const fetchDatasets = createAsyncThunk('datasets/fetchDatasets', async (_, { rejectWithValue }) => {
  try {
    const response = await datasetService.getDatasets();
    return response.datasets;
  } catch {
    return rejectWithValue('Failed to fetch datasets.');
  }
});

// 4. Async Thunk for fetching a single dataset's data
export const fetchDatasetData = createAsyncThunk(
  'datasets/fetchDatasetData',
  async (datasetName: string, { rejectWithValue, getState }) => {
    try {
      const { datasets } = (getState() as { datasets: DatasetState }).datasets;
      const dataset = datasets.find(d => d.name === datasetName);
      if (!dataset) {
        return rejectWithValue(`Dataset "${datasetName}" not found.`);
      }
      const response = await datasetService.getDatasetData(datasetName);
      return { dataset, data: response.data };
    } catch {
      return rejectWithValue(`Failed to fetch data for ${datasetName}.`);
    }
  }
);

// 5. Creates the actual slice
const datasetSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for the list of datasets
      .addCase(fetchDatasets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatasets.fulfilled, (state, action: PayloadAction<Dataset[]>) => {
        state.loading = false;
        state.datasets = action.payload;
      })
      .addCase(fetchDatasets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Reducers for a single dataset's data
      .addCase(fetchDatasetData.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchDatasetData.fulfilled, (state, action: PayloadAction<{ dataset: Dataset; data: DataRecord[] }>) => {
        state.dataLoading = false;
        state.currentDataset = action.payload.dataset;
        state.currentDatasetData = action.payload.data;
      })
      .addCase(fetchDatasetData.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default datasetSlice.reducer;
