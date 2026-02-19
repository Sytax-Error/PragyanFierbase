export interface VizPluginMetadata {
  name: string;
  description: string;
  thumbnail: string;
}

export interface VizPlugin {
  type: string;
  metadata: VizPluginMetadata;
  [key: string]: unknown;
}
