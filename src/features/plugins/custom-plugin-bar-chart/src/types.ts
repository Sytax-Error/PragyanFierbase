export type DataRecord = Record<string, unknown>;

export interface BarChartProps {
  data: { name: string; value: unknown }[];
}

export interface BarChartPluginConfig {
  dimension: string;
  measure: string;
}

export interface TransformPropsOptions {
  dataset: DataRecord[];
  controls: BarChartPluginConfig;
}
