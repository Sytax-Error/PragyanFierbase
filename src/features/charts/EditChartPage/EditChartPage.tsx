
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vizRegistry, type VizPlugin } from "@/core/visualization";
import { runChart } from "@/core/chart-engine";
import { useTheme } from "@/hooks/theme/useTheme";
import { useDataset } from "@/hooks/data/useDataset";
import { StatusIndicator } from "@/components";
import { EditChartSidebar, EditChartMain } from "./components";
import "@/features/charts/EditChartPage/EditChartPage.css";
import { validateControls } from "@/core/validation/validation";
import { setEditorState } from "@/store/slices/chartEditorSlice";
import type { RootState } from "@/store";

type Status = "loading" | "found" | "not-found";

const EditChartPage: React.FC = () => {
  // --- Params and Hooks ---
  const { chartId } = useParams<{ chartId: string }>();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // --- State ---
  const [ChartComponent, setChartComponent] = useState<React.ComponentType<unknown> | null>(null);
  const [chartProps, setChartProps] = useState<unknown>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userModifiedControls, setUserModifiedControls] = useState<Record<string, unknown> | undefined>(undefined);

  // --- Data Loading ---
  const existingChart = useSelector((state: RootState) =>
    state.charts.charts.find((chart) => chart.id === chartId)
  );

  const {
    dataset,
    data: currentDatasetData,
    loading: dataLoading,
  } = useDataset(existingChart?.datasetId);

  const plugin: VizPlugin | null = useMemo(
    () => (existingChart ? vizRegistry.get(existingChart.chartType) ?? null : null),
    [existingChart]
  );

  const status: Status = useMemo(() => {
    if (!existingChart) return "loading"; // Could also be a "not-found" state
    return plugin ? "found" : "not-found";
  }, [existingChart, plugin]);

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
      ...(userModifiedControls ?? existingChart?.controls),
    }),
    [initialControls, userModifiedControls, existingChart]
  );

  // --- State Synchronization and Effects ---
  useEffect(() => {
    if (existingChart) {
      dispatch(
        setEditorState({
          datasetId: existingChart.datasetId,
          chartType: existingChart.chartType,
          controls: controls,
        })
      );
    }
  }, [dispatch, existingChart, controls]);

  useEffect(() => {
    const renderChart = async () => {
      if (existingChart && currentDatasetData && plugin) {
        const { Component, props } = await runChart({
          dataset: currentDatasetData,
          chartType: existingChart.chartType,
          controls: controls, // Use the latest controls
        });
        setChartComponent(() => Component);
        setChartProps(props);
      }
    };
    renderChart();
  }, [existingChart, currentDatasetData, plugin, controls]); // Rerun on control changes

  // --- Event Handlers ---
  const handleControlChange = (controlName: string, value: unknown) => {
    setUserModifiedControls((prevControls) => ({
      ...(prevControls ?? existingChart?.controls),
      [controlName]: value,
    }));
  };

  const isSaveDisabled = useMemo(() => {
    if (!plugin?.controlPanel?.fields) {
      return true;
    }
    return !validateControls(plugin.controlPanel.fields, controls);
  }, [controls, plugin]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  if (!existingChart) {
    return <Navigate to="/charts" replace />;
  }

  if (status === "not-found") {
    return (
      <StatusIndicator
        status="not-found"
        message={`Plugin "${existingChart.chartType}" not found.`}
      />
    );
  }

  if (!plugin || !dataset) {
    return <StatusIndicator status="error" message="Something went wrong" />;
  }

  return (
    <div
      className={`edit-chart-container ${theme} ${isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
    >
      <EditChartSidebar
        title="Control Section"
        plugin={plugin}
        dataset={dataset}
        controls={controls}
        handleControlChange={handleControlChange}
        onCreateChart={() => { }} // No create functionality on this page
        isLoading={dataLoading}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isCreationDisabled={isSaveDisabled}
        isEditMode={true} // Explicitly true
      />
      <EditChartMain
        dataLoading={dataLoading}
        ChartComponent={ChartComponent}
        chartProps={chartProps}
      />
    </div>
  );
};

export default EditChartPage;
