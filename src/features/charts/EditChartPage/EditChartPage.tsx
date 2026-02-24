
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
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
  const params = useParams<{
    datasetId?: string;
    chartType?: string;
    chartId?: string;
  }>();

  const isEditMode = Boolean(params.chartId);

  const existingChart = useSelector((state: RootState) =>
    state.charts.charts.find((chart) => chart.id === params.chartId)
  );

  const dispatch = useDispatch();
  const { theme } = useTheme();

  // FIX: Moved useState hooks to the top of the component
  const [ChartComponent, setChartComponent] =
    useState<React.ComponentType<unknown> | null>(null);
  const [chartProps, setChartProps] = useState<unknown>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userModifiedControls, setUserModifiedControls] = useState<
    Record<string, unknown> | undefined
  >({});

  const effectiveDatasetId = isEditMode
    ? existingChart?.datasetId
    : params.datasetId;

  const effectiveChartType = isEditMode
    ? existingChart?.chartType
    : params.chartType;
  const {
    dataset,
    data: currentDatasetData,
    loading: dataLoading,
  } = useDataset(effectiveDatasetId);

  const plugin: VizPlugin | null = useMemo(
    () =>
      effectiveChartType ? (vizRegistry.get(effectiveChartType) ?? null) : null,
    [effectiveChartType]
  );

  const status: Status = useMemo(() => {
    if (!effectiveChartType) return "loading";
    return plugin ? "found" : "not-found";
  }, [effectiveChartType, plugin]);

  useEffect(() => {
    if (isEditMode && existingChart) {
      setUserModifiedControls(existingChart.controls);
    }
  }, [isEditMode, existingChart]);

  useEffect(() => {
    const renderChart = async () => {
      if (
        isEditMode &&
        existingChart &&
        currentDatasetData &&
        effectiveChartType
      ) {
        const { Component, props } = await runChart({
          dataset: currentDatasetData,
          chartType: effectiveChartType,
          controls: existingChart.controls,
        });

        setChartComponent(() => Component);
        setChartProps(props);
      }
    };

    renderChart();
  }, [isEditMode, existingChart, currentDatasetData, effectiveChartType]);

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

  useEffect(() => {
    dispatch(
      setEditorState({
        datasetId: effectiveDatasetId,
        chartType: effectiveChartType,
        controls: controls,
      })
    );
  }, [dispatch, effectiveDatasetId, effectiveChartType, controls]);

  const handleControlChange = (controlName: string, value: unknown) => {
    setUserModifiedControls((prevControls) => ({
      ...prevControls,
      [controlName]: value,
    }));
  };

  const handleCreateChart = async () => {
    if (currentDatasetData && effectiveChartType && plugin) {
      const { Component, props } = await runChart({
        dataset: currentDatasetData,
        chartType: effectiveChartType,
        controls,
      });
      setChartComponent(() => Component);
      setChartProps(props);
    }
  };

  const isCreateChartDisabled = useMemo(() => {
    if (!plugin?.controlPanel?.fields) {
      return true;
    }
    return !validateControls(plugin.controlPanel.fields, controls);
  }, [controls, plugin]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (status === "loading") {
    return <StatusIndicator status="loading" message="Loading plugin..." />;
  }

  if (status === "not-found") {
    return (
      <StatusIndicator
        status="not-found"
        message={`Plugin "${params.chartType}" not found.`}
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
        title={"Controle Section"}
        plugin={plugin}
        dataset={dataset}
        controls={controls}
        handleControlChange={handleControlChange}
        onCreateChart={handleCreateChart}
        isLoading={dataLoading}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isCreationDisabled={isCreateChartDisabled}
        isEditMode={isEditMode}
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
