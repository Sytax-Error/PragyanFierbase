# Project Blueprint

## Overview

This document outlines the architecture and implementation details of the Pragyan BI tool. It serves as a single source of truth for the project's design, features, and future development plans.

## Current State

- **Data Layer:**
  - A mock data service (`src/services/api/dataset.service.ts`) provides datasets and their schemas.
  - It uses `@faker-js/faker` to dynamically generate realistic data for any defined schema.
  - Redux Toolkit (`datasetSlice.ts`) is used to manage the dataset state globally.
  - A `useDataset` hook provides easy access to dataset information.

- **Chart Engine:**
  - A plugin-based architecture (`vizRegistry`) allows for easy extension with new chart types.
  - The `runChart` function orchestrates the rendering of charts, including data transformation.
  - The `EditChartPage` provides a user interface for configuring charts.

- **Chart Types:**
  - A custom bar chart plugin (`custom-plugin-bar-chart`) is implemented.

- **UI/UX:**
  - The UI intelligently filters dropdowns to show only valid column types (dimensions vs. measures).

- **UI Components:**
  - Control components (`ColorPicker`, `Slider`, `DataColumnSelector`) are consolidated and exported from a single `ControlPanel` component for better organization and reusability.

## Next Feature: Saving and Listing Charts

### Plan

1.  **Chart Service (`src/services/api/chart.service.ts`):**
    -   Create a new mock service to manage chart configurations.
    -   It will store chart data in-memory.
    -   **`saveChart(chartConfig)`:** A function to save a new chart configuration.
    -   **`getCharts()`:** A function to retrieve the list of all saved charts.

2.  **Save Functionality (`EditChartPage.tsx`):**
    -   Add a "Save Chart" button to the UI.
    -   On click, the button will capture the current chart's configuration (chart type, controls, dataset ID).
    -   It will call the `chartService.saveChart()` method to persist the configuration.

3.  **Dynamic Chart List (`ChartsPage/ChartsPage.tsx`):**
    -   Refactor the `ChartsPage` to remove the hardcoded chart data.
    -   Use the `chartService.getCharts()` method to fetch the list of saved charts.
    -   Display the dynamic list of charts, each linking to its corresponding `EditChartPage`.
