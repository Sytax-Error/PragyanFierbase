import { vizRegistry } from '../plugins/registry';

interface RunChartParams {
  dataset: string;
  chartType: string;
  controls: Record<string, any>;
}

export const runChart = async ({ dataset, chartType, controls }: RunChartParams) => {
  const plugin = vizRegistry.get(chartType);

  if (!plugin) {
    throw new Error(`Unknown chart type: ${chartType}`);
  }

  // 1. Fetch data (mocked for now)
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve([{ x: 'A', y: 10 }, { x: 'B', y: 20 }]), 500)
  );

  // 2. Transform props
  const transformedProps = plugin.transformProps
    ? plugin.transformProps.length > 1
      ? plugin.transformProps(data, controls)
      : plugin.transformProps({ data, controls })
    : { chartData: data };

  // 3. Return component and props
  return {
    Component: plugin.Component || plugin.component,
    props: transformedProps,
  };
};
