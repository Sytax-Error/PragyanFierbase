import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Dataset } from '../../types/dataset';
import * as datasetService from '../../services/api/dataset.service';

// 1. Defines the "shape" of this slice's state
interface DatasetState {
  datasets: Dataset[];
  loading: boolean;
  error: string | null;
}

// 2. Sets the initial state when the app first loads
const initialState: DatasetState = {
  datasets: [],
  loading: false,
  error: null,
};

// 3. Creates an Asynchronous Thunk for fetching data
export const fetchDatasets = createAsyncThunk('datasets/fetchDatasets', async (_, { rejectWithValue }) => {
  try {
    console.log('Slice: fetchDatasets thunk is running...');
    const response = await datasetService.getDatasets();
    return response.datasets;
  } catch (error) {
    console.error('Slice: Error in fetchDatasets thunk:', error);
    return rejectWithValue('Failed to fetch datasets.');
  }
});

// 4. Creates the actual slice
const datasetSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {},
  // This handles the state updates based on the async thunk's status
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatasets.pending, (state) => {
        console.log('Slice: fetchDatasets is pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatasets.fulfilled, (state, action: PayloadAction<Dataset[]>) => {
        console.log('Slice: fetchDatasets fulfilled.');
        state.loading = false;
        state.datasets = action.payload;
      })
      .addCase(fetchDatasets.rejected, (state, action) => {
        console.log('Slice: fetchDatasets rejected.');
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default datasetSlice.reducer;
