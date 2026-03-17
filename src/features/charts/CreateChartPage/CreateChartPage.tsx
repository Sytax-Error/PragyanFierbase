
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { vizRegistry, type VizPlugin } from "@/core/visualization";
import { runChart } from "@/core/chart-engine";
import { useTheme } from "@/hooks/theme/useTheme";
import { useDataset } from "@/hooks/data/useDataset";
import { StatusIndicator } from "@/components";
import { EditChartSidebar, EditChartMain } from "@/features/charts/EditChartPage/components";
import "@/features/charts/EditChartPage/EditChartPage.css"; // We can reuse the same CSS
import { validateControls } from "@/core/validation/validation";
import { setEditorState } from "@/store/slices/chartEditorSlice";

type Status = "loading" | "found" | "not-found";

const CreateChartPage: React.FC = () => {
  // --- Params and Hooks ---
  const { datasetId, chartType } = useParams<{
    datasetId: string;
    chartType: string;
  }>();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // --- State ---
  const [ChartComponent, setChartComponent] = useState<React.ComponentType<unknown> | null>(null);
  const [chartProps, setChartProps] = useState<unknown>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userModifiedControls, setUserModifiedControls] = useState<Record<string, unknown>>({});

  // --- Data and Plugin Loading ---
  const {
    dataset,
    data: currentDatasetData,
    loading: dataLoading,
  } = useDataset(datasetId);

  const plugin: VizPlugin | null = useMemo(
    () => (chartType ? vizRegistry.get(chartType) ?? null : null),
    [chartType]
  );

  const status: Status = useMemo(() => {
    if (!chartType) return "loading";
    return plugin ? "found" : "not-found";
  }, [chartType, plugin]);

  // --- Controls Management ---
  const initialControls = useMemo(() => {
    if (!plugin) return {};
    const controls: Record<string, unknown> = {};
    plugin.controlPanel?.fields?.forEach((field) => {
      controls[field.key] = field.defaultValue;
    });
    return controls;
  }, [plugin]);

  const controls = useMemo(
    () => ({
      ...initialControls,
      ...userModifiedControls,
    }),
    [initialControls, userModifiedControls]
  );

  // --- Real-Time Chart Rendering Engine ---
  useEffect(() => {
    const renderChart = async () => {
      // Ensure we have all necessary data before proceeding
      if (dataLoading || !currentDatasetData || !chartType || !plugin) {
        return;
      }
      
      // If controls are invalid, clear the chart preview
      if (plugin.controlPanel?.fields && !validateControls(plugin.controlPanel.fields, controls)) {
        if (ChartComponent) {
            setChartComponent(null);
            setChartProps(null);
        }
        return;
      }

      // Run the chart engine to get the component and its props
      const { Component, props } = await runChart({
        dataset: currentDatasetData,
        chartType: chartType,
        controls,
      });

      // Update state to re-render the chart preview
      setChartComponent(() => Component);
      setChartProps(props);
    };

    renderChart();
  // This effect re-runs whenever the underlying data or controls change
  }, [currentDatasetData, chartType, plugin, controls, dataLoading, ChartComponent]);

  // --- State Synchronization with Redux Editor Slice ---
  useEffect(() => {
    dispatch(
      setEditorState({
        datasetId: datasetId,
        chartType: chartType,
        controls: controls,
      })
    );
  }, [dispatch, datasetId, chartType, controls]);

  // --- Event Handlers ---
  const handleControlChange = (controlName: string, value: unknown) => {
    setUserModifiedControls((prevControls) => ({
      ...prevControls,
      [controlName]: value,
    }));
  };

  const isSaveDisabled = useMemo(() => {
    if (!plugin?.controlPanel?.fields) {
      return true; // Cannot save if there are no controls to validate
    }
    // Disable saving if controls are invalid
    return !validateControls(plugin.controlPanel.fields, controls);
  }, [controls, plugin]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // --- Render Logic ---
  if (status === "loading") {
    return <StatusIndicator status="loading" message="Loading plugin..." />;
  }

  if (status === "not-found") {
    return (
      <StatusIndicator
        status="not-found"
        message={`Plugin "${chartType}" not found.`}
      />
    );
  }

  if (!plugin || !dataset) {
    return <StatusIndicator status="error" message="Something went wrong" />;
  }

  return (
    <div
      className={`edit-chart-container ${theme} ${
        isSidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <EditChartSidebar
        title="Control Section"
        plugin={plugin}
        dataset={dataset}
        controls={controls}
        handleControlChange={handleControlChange}
        // The "Create" button is now for saving the chart.
        // The actual save logic will be implemented in the SubHeaderActions.
        onCreateChart={() => { console.log("Save chart logic to be implemented"); }}
        isLoading={dataLoading}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        // This prop now controls the save button
        isCreationDisabled={isSaveDisabled}
        isEditMode={false} // Explicitly false for creation
      />
      <EditChartMain
        dataLoading={dataLoading}
        ChartComponent={ChartComponent}
        chartProps={chartProps}
      />
    </div>
  );
};

export default CreateChartPage;
