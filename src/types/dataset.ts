// src/types/dataset.ts

/**
 * This file defines the TypeScript interface for a Dataset.
 */

export type Dataset = {
  id: string;
  name: string;
  description: string;
  columns: Column[];
};

export type Column = {
  name: string;
  type: string;
};

export type DatasetResponse = {
    datasets: Dataset[];
}
