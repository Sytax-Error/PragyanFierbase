# Project Blueprint

## Overview

This document outlines the project structure, design, and features of the application. It serves as a single source of truth for the application's current state and future development plans.

## Project Structure

The project is a React application built with Vite, using a standard project structure. The main entry point is `src/main.tsx`, and the application's routes are defined in `src/app/routes/routes.tsx`.

## Implemented Features

- **Dashboard Management:**
  - **Dashboard List:** A page to display a list of all dashboards.
  - **Add Dashboard:** A powerful dashboard composition tool. This page features a sidebar with a list of all user-created charts, read directly from the Redux store. Users can add, arrange, resize, and remove these saved charts on an interactive grid to build a new dashboard. The system prevents duplicate charts from being added to the same dashboard. The canvas renders the charts using their saved configurations, providing a real-time preview.
  - **Edit Dashboard:** A page for editing the name of an existing dashboard.
  - **Dashboard Detail:** A page to view the details of a specific dashboard.
- **Chart Management:**
  - **Chart List:** A page to display a list of all charts.
  - **Add Chart:** A wizard-style interface for creating new charts. When a chart is saved, its configuration is persisted in the Redux store.
  - **Create Chart (Real-Time):** The chart creation page now provides a real-time editing experience. The chart preview updates automatically as the user modifies the controls, providing instant feedback and a more intuitive workflow. The "Preview Chart" button has been removed, as it is no longer necessary.
  - **Edit Chart:** A page to edit an existing chart.
- **Dataset Management:**
  - **Dataset Table:** A page to display a table of all datasets.

## Chart Plugin Architecture

Chart plugins are created using the `createVizPlugin` function, which is located in `src/core/visualization/createPlugin.ts`. This function takes an object with the following properties:

- `type`: A unique string that identifies the plugin.
- `metadata`: An object containing the plugin's name, description, and other metadata.
- `controlPanel`: An object that defines the controls for the plugin's control panel.
- `transformProps`: A function that transforms the component's props before they are passed to the component.
- `Component`: The React component that renders the chart.

To access the chart component, you must use the `Component` property (with a capital "C") of the plugin object.

### Data Transformation

The `transformProps` function is a crucial part of the plugin architecture. It takes a `dataset` and a `controls` object, and it returns an object with the props that the chart component expects. This allows for a clean separation between the raw data and the component's props, and it ensures that the component receives the data in the correct format.

## State Management

The application uses Redux for state management, with `redux-persist` to save the state to `localStorage`. The primary state slice is the `chartSlice`, which manages the list of all user-created charts.

- **`chartSlice.ts`**: Defines the Redux slice for charts, including the `Chart` interface, the initial state, and reducers for adding and updating charts.

## Current Plan

The current implementation provides a clear separation of concerns:

- The `AddDashboardPage` is a full-featured dashboard composition tool, allowing users to build dashboards by selecting, arranging, resizing, and removing charts from their library of saved charts.
- The `AddChartPage` provides a step-by-step wizard for creating and configuring individual charts, which are then saved to the Redux store.
- The `CreateChartPage` now offers a real-time editing experience, making the chart creation process more intuitive and efficient.

This approach ensures a streamlined and intuitive workflow for both creating and managing dashboards and charts, with all data being correctly persisted and rendered.