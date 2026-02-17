import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatasets, fetchDatasetData } from '../../store/slices/datasetSlice';
import type { RootState, AppDispatch } from '../../store';

export const useDataset = (datasetId?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { datasets, currentDataset, currentDatasetData, dataLoading, error } = useSelector((state: RootState) => state.datasets);

  useEffect(() => {
    // Fetch the list of all datasets if it's not already loaded
    if (datasets.length === 0) {
      dispatch(fetchDatasets());
    }
  }, [dispatch, datasets.length]);

  useEffect(() => {
    // When the datasetId from the URL is available and the list of datasets has loaded,
    // find the matching dataset and fetch its specific data.
    if (datasetId && datasets.length > 0) {
      const selectedDataset = datasets.find(d => d.id === datasetId);
      if (selectedDataset) {
        dispatch(fetchDatasetData(selectedDataset.name));
      }
    }
  }, [datasetId, dispatch, datasets]);

  return { dataset: currentDataset, data: currentDatasetData, loading: dataLoading, error };
};
