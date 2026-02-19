import { createVizPlugin, registerVizPlugin } from '@/core/visualization';
import { metadata } from './plugin/metadata';
import { controlPanel } from './plugin/controlPanel';
import { transformProps } from './plugin/transformProps';
import BarChart from './BarChart';

const barChartPlugin = createVizPlugin({
  type: 'custom-plugin-bar-chart',
  metadata,
  controlPanel,
  transformProps,
  Component: BarChart,
});

registerVizPlugin(barChartPlugin);
