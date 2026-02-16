interface VizPlugin {
  type: string;
  [key: string]: unknown;
}

const plugins = new Map<string, VizPlugin>();

export const vizRegistry = {
  register(plugin: VizPlugin) {
    if (plugins.has(plugin.type)) {
      // Don't throw, just warn so HMR doesn't break.
      console.warn(
        `[vizRegistry] Plugin with type "${plugin.type}" is already registered.`
      );
      return;
    }
    plugins.set(plugin.type, plugin);
  },
  get(type: string): VizPlugin | undefined {
    return plugins.get(type);
  },
  list(): VizPlugin[] {
    return Array.from(plugins.values());
  },
};
