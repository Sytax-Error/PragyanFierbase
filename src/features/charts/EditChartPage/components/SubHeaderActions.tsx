
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { addChart } from '@/store/slices/chartSlice';
import { selectChartEditor } from '@/store/slices/chartEditorSlice';
import { fetchDatasets } from '@/store/slices/datasetSlice';
import { vizRegistry } from '@/core/visualization';
import type { RootState, AppDispatch } from '@/store';

const SubHeaderActions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const editorState = useSelector(selectChartEditor);
  const { datasets, loading } = useSelector((state: RootState) => state.datasets);
  console.log('editorState:',editorState)
  useEffect(() => {
    // Fetch datasets if they haven't been loaded yet
    if (datasets.length === 0 && !loading) {
      dispatch(fetchDatasets());
    }
  }, [dispatch, datasets.length, loading]);

  const handleSave = () => {
    if (editorState.isInitialized && editorState.datasetId && editorState.chartType) {
      // Find the dataset name from the Redux state
      const datasetName = datasets.find(d => d.id === editorState.datasetId)?.name || 'Unknown Dataset';
      const chartPlugin = vizRegistry.get(editorState.chartType);
      const chartName = chartPlugin?.metadata.name || 'Unknown Chart';
      
      const newChart = {
        id: new Date().toISOString(),
        name: editorState.controls.headerText as string,
        type: chartName,
        dataset: datasetName,
        datasetId: editorState.datasetId,
        chartType: editorState.chartType,
        onDashboards: 'N/A',
        tags: '',
        owners: 'Me',
        lastModified: new Date().toISOString(),
        controls: editorState.controls,
      };

      dispatch(addChart(newChart));
      navigate('/charts');
    }else{
      console.log("else part 1")
    }
  };

  return (
    <div className="sub-header-actions">
      <Button onClick={handleSave} disabled={!editorState.isInitialized || loading}>
        Save
      </Button>
    </div>
  );
};

export default SubHeaderActions;
