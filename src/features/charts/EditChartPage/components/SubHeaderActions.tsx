
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components';
import { addChart, updateChart } from '@/store/slices/chartSlice';
import { selectChartEditor, resetEditor } from '@/store/slices/chartEditorSlice';
import { fetchDatasets } from '@/store/slices/datasetSlice';
import { vizRegistry } from '@/core/visualization';
import type { RootState, AppDispatch } from '@/store';

const SubHeaderActions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams<{ chartId?: string }>();
  const isEditMode = Boolean(params.chartId);

  const editorState = useSelector(selectChartEditor);
  const { datasets, loading } = useSelector((state: RootState) => state.datasets);

  useEffect(() => {
    if (datasets.length === 0 && !loading) {
      dispatch(fetchDatasets());
    }
  }, [dispatch, datasets.length, loading]);

  const handleSave = () => {
    if (editorState.isInitialized && editorState.datasetId && editorState.chartType) {
      const datasetName = datasets.find(d => d.id === editorState.datasetId)?.name || 'Unknown Dataset';
      const chartPlugin = vizRegistry.get(editorState.chartType);
      const chartName = chartPlugin?.metadata.name || 'Unknown Chart';

      if (isEditMode && params.chartId) {
        // Logic for updating an existing chart
        const changes = {
            name: editorState.controls.headerText as string,
            type: chartName,
            dataset: datasetName,
            datasetId: editorState.datasetId,
            chartType: editorState.chartType,
            lastModified: new Date().toISOString(),
            controls: editorState.controls,
        };
        dispatch(updateChart({ id: params.chartId, changes }));
      } else {
        // Logic for creating a new chart
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
      }

      // Reset the editor state after saving
      dispatch(resetEditor());
      
      // Navigate back to the charts list
      navigate('/charts');
    }
  };

  return (
    <div className="sub-header-actions">
      <Button onClick={handleSave} disabled={!editorState.isInitialized || loading}>
        {isEditMode ? 'Update' : 'Save'}
      </Button>
    </div>
  );
};

export default SubHeaderActions;
