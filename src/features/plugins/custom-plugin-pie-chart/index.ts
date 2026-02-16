import { createVizPlugin, registerVizPlugin } from '../createPlugin';
import { metadata } from './metadata';
import { controlPanel } from './controlPanel';
import { transformProps } from './transformProps';
import PieChart from './PieChart';

const pieChartPlugin = createVizPlugin({
  type: 'custom-plugin-pie-chart',
  metadata,
  controlPanel,
  transformProps,
  Component: PieChart,
});

registerVizPlugin(pieChartPlugin);
