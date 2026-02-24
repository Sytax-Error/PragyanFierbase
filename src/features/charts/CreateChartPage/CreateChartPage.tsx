
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

  // --- State Synchronization ---
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

  const handlePreviewChart = async () => {
    if (currentDatasetData && chartType && plugin) {
      const { Component, props } = await runChart({
        dataset: currentDatasetData,
        chartType: chartType,
        controls,
      });
      setChartComponent(() => Component);
      setChartProps(props);
    }
  };
  
  const isPreviewDisabled = useMemo(() => {
    if (!plugin?.controlPanel?.fields) {
      return true;
    }
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
        onCreateChart={handlePreviewChart} // Renamed for clarity in this context
        isLoading={dataLoading}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isCreationDisabled={isPreviewDisabled}
        isEditMode={false} // Explicitly false
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
