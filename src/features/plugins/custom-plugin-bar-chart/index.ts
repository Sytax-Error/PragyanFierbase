import { createVizPlugin, registerVizPlugin } from '../createPlugin';
import { metadata } from './metadata';
import { controlPanel } from './controlPanel';
import { transformProps } from './transformProps';
import BarChart from './BarChart';

const barChartPlugin = createVizPlugin({
  type: 'custom-plugin-bar-chart',
  metadata,
  controlPanel,
  transformProps,
  Component: BarChart,
});

registerVizPlugin(barChartPlugin);
