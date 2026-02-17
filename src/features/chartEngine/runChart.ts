import { vizRegistry } from '../plugins/registry';

interface RunChartParams {
  dataset: any[]; // The actual dataset
  chartType: string;
  controls: Record<string, any>;
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

  // Return component and props
  return {
    Component: plugin.Component || plugin.component, // Handle different component property names
    props: transformedProps,
  };
};
