
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, SaveConfirmationDialog } from '@/components';
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editorState = useSelector(selectChartEditor);
  const { datasets, loading } = useSelector((state: RootState) => state.datasets);

  useEffect(() => {
    if (datasets.length === 0 && !loading) {
      dispatch(fetchDatasets());
    }
  }, [dispatch, datasets.length, loading]);

  const performSave = () => {
    if (!editorState.isInitialized || !editorState.datasetId || !editorState.chartType) return;

    const datasetName = datasets.find(d => d.id === editorState.datasetId)?.name || 'Unknown Dataset';
    const chartPlugin = vizRegistry.get(editorState.chartType);
    const chartName = chartPlugin?.metadata.name || 'Unknown Chart';

    if (isEditMode && params.chartId) {
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
  };

  const handleSaveClick = () => {
    performSave();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmAndNavigate = () => {
    // The save has already happened, so we just navigate.
    setIsDialogOpen(false);
    if (!isEditMode) {
        dispatch(resetEditor());
    }
    navigate('/charts');
  };

  // This handler now just closes the dialog.
  const handleConfirmAndStay = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="sub-header-actions">
        <Button onClick={handleSaveClick} disabled={!editorState.isInitialized || loading}>
          {isEditMode ? 'Update' : 'Save'}
        </Button>
      </div>

      <SaveConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirmAndNavigate={handleConfirmAndNavigate}
        onConfirmAndStay={handleConfirmAndStay}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default SubHeaderActions;
