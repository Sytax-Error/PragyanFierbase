export type DataRecord = Record<string, unknown>;

export interface BarChartProps {
  data: DataRecord[];
  headerText: string;
  hideHeader?: boolean;
}

export interface BarChartPluginConfig {
  dimension: string;
  measure: string;
  headerText: string;
  hideHeader?: boolean;
}

export interface TransformPropsOptions {
  dataset: DataRecord[];
  controls: BarChartPluginConfig;
}
