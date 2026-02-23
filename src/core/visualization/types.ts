export interface VizPluginMetadata {
  name: string;
  description: string;
  thumbnail: string;
}

export interface ValidationRule {
  notEmpty?: boolean;
}

export interface ControlPanelField {
  key: string;
  label: string;
  type: string;
  kind?: 'dimension' | 'measure';
  defaultValue: unknown;
  validation?: ValidationRule;
  config?: Record<string, unknown>;
}

export interface ControlPanelDef {
  fields: ControlPanelField[];
}

export interface VizPlugin {
  type: string;
  metadata: VizPluginMetadata;
  controlPanel?: ControlPanelDef;
  transformProps?: (...args: unknown[]) => unknown;
  [key: string]: unknown;
}
