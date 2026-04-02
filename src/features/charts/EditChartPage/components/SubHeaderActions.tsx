import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ConfirmationDialog } from "@/components"; // Correctly import ConfirmationDialog
import { addChart, updateChart } from "@/store/slices/chartSlice";
import {
  selectChartEditor,
  resetEditor,
} from "@/store/slices/chartEditorSlice";
import { fetchDatasets } from "@/store/slices/datasetSlice";
import { vizRegistry } from "@/core/visualization";
import type { RootState, AppDispatch } from "@/store";
import { List, CheckCircle } from "lucide-react";

const SubHeaderActions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams<{ chartId?: string }>();
  const isEditMode = Boolean(params.chartId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editorState = useSelector(selectChartEditor);
  const { datasets, loading } = useSelector(
    (state: RootState) => state.datasets,
  );

  useEffect(() => {
    if (datasets.length === 0 && !loading) {
      dispatch(fetchDatasets());
    }
  }, [dispatch, datasets.length, loading]);

  const performSave = () => {
    if (
      !editorState.isInitialized ||
      !editorState.datasetId ||
      !editorState.chartType
    )
      return;

    const datasetName =
      datasets.find((d) => d.id === editorState.datasetId)?.name ||
      "Unknown Dataset";
    const chartPlugin = vizRegistry.get(editorState.chartType);
    const chartName = chartPlugin?.metadata.name || "Unknown Chart";

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
        onDashboards: "N/A",
        tags: "",
        owners: "Me",
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
    setIsDialogOpen(false);
    if (!isEditMode) {
      dispatch(resetEditor());
    }
    navigate("/charts");
  };

  const handleConfirmAndStay = () => {
    setIsDialogOpen(false);
  };

  const headingText = isEditMode
    ? "Chart Updated Successfully!"
    : "Chart Saved Successfully!";
  const paragraphText = isEditMode
    ? "Your changes have been saved. You can continue editing or return to the charts list."
    : "Your new chart has been saved. You can view it in the charts list or stay to create another.";
  const stayText = isEditMode ? "Continue Editing" : "Save & Create Another";

  return (
    <>
      <div className="sub-header-actions">
        <Button
          onClick={handleSaveClick}
          disabled={!editorState.isInitialized || loading}
        >
          {isEditMode ? "Update" : "Save"}
        </Button>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title={headingText}
        message={paragraphText}
        icon={<CheckCircle size={32} className="success-icon" />}
        primaryAction={{
          text: (
            <>
              <List size={16} /> Go to Charts List
            </>
          ),
          onClick: handleConfirmAndNavigate,
        }}
        secondaryAction={{
          text: stayText,
          onClick: handleConfirmAndStay,
        }}
      />
    </>
  );
};

export default SubHeaderActions;
