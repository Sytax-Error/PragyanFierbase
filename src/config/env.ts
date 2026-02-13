// src/config/env.ts

/**
 * This file exports a configuration object with environment variables.
 * It provides a single source of truth for environment-specific settings.
 */

const envConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

export default envConfig;
