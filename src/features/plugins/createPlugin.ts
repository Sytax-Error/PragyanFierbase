import { vizRegistry } from './registry';

// Define a function to create a new plugin
export function createVizPlugin(plugin) {
  return plugin;
}

// Define a function to register a new plugin
export function registerVizPlugin(plugin) {
  vizRegistry.register(plugin);
}
