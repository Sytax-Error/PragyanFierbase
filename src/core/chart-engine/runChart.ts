import { vizRegistry } from "@/core/visualization";
import type { ComponentType } from "react";

// Define a more specific type for dataset records
type DataRecord = Record<string, unknown>;

interface RunChartParams {
  dataset: DataRecord[]; // The actual dataset
  chartType: string;
  controls: Record<string, unknown> | undefined;
}

export const runChart = async ({ dataset, chartType, controls }: RunChartParams) => {
  const plugin = vizRegistry.get(chartType);

  if (!plugin) {
    throw new Error(`Unknown chart type: ${chartType}`);
  }

  // Data is now passed in directly, so no fetching is needed here.

  // Transform props, handling different function signatures for transformProps
  const transformedProps = plugin.transformProps
    ? plugin.transformProps.length > 1
      ? plugin.transformProps(dataset, controls) // For functions like (data, controls)
      : plugin.transformProps({ dataset: dataset, controls }) // For functions like ({ dataset, controls })
    : { chartData: dataset };

  const Component = (plugin.Component || plugin.component) as ComponentType<unknown>;

  // Return component and props
  return {
    Component: Component,
    props: transformedProps,
  };
};
