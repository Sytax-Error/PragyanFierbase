import { createVizPlugin } from "@/core/viz/createPlugin";
import { vizRegistry } from "@/core/viz/registry";
import { metadata } from "./metadata";
import { controlPanel } from "./controlPanel";
import { transformProps } from "./transformProps";
import Chart from "./Chart";

const barChartPlugin = createVizPlugin({
  type: "bar-chart",
  metadata,
  controlPanel,
  transformProps,
  Component: Chart,
});

vizRegistry.register(barChartPlugin);
