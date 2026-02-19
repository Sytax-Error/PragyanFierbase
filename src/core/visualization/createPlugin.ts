import { vizRegistry } from '@/core/visualization/registry';
import type { VizPlugin } from '@/core/visualization/types';

// Define a function to create a new plugin
export function createVizPlugin(plugin: VizPlugin): VizPlugin {
  return plugin;
}

// Define a function to register a new plugin
export function registerVizPlugin(plugin: VizPlugin) {
  vizRegistry.register(plugin);
}
