export type DataRecord = Record<string, unknown>;

export interface BarChartProps {
  data: DataRecord[];
  headerText:string;
}

export interface BarChartPluginConfig {
  dimension: string;
  measure: string;
  headerText:string;
}

export interface TransformPropsOptions {
  dataset: DataRecord[];
  controls: BarChartPluginConfig;
}
