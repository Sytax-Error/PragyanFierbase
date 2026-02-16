# Project Blueprint

## Overview

This document outlines the plan for creating a data analysis and visualization tool. The application will allow users to connect to various data sources, query data, and visualize it through different types of charts.

## Implemented Features

### Initial Setup

The initial setup involved creating the basic folder structure for the React application. This helps in organizing the code and keeping it modular.

*   `src/app`: Core application logic and setup.
*   `src/components`: Reusable UI components.
*   `src/config`: Application configuration files.
*   `src/features`: Modules for different application features (e.g., dashboard, charts, auth).
    *   `src/features/auth`: User authentication components and logic.
    *   `src/features/charts`: Components for creating and displaying charts.
    *   `src/features/dashboard`: The main dashboard component.
    *   `src/features/datasets`: Components for managing data sources.
*   `src/hooks`: Custom React hooks.
*   `src/layouts`: Application layout components.
*   `src/routes`: Application routing configuration.
*   `src/services`: Services for interacting with APIs and other external resources.
*   `src/store`: State management configuration.
*   `src/types`: TypeScript type definitions.
*   `src/utils`: Utility functions.

### Basic UI and Routing

*   **Routing:** A basic routing system has been set up using `react-router-dom`.
*   **Layout:** A main layout has been created with a header and a content area.
*   **Dashboard:** A basic dashboard component has been created to serve as the main view.
*   **Data and Charts:** Placeholders for data and charts have been added to the dashboard.

### Theme Switching

*   **Theme Context:** A `ThemeContext` has been created to manage and provide the current theme (light/dark) throughout the application.
*   **Theme Provider:** The `ThemeProvider` wraps the application to make the theme context available to all components.
*   **useTheme Hook:** A `useTheme` hook was implemented for easy access to the theme state and toggle function.
*   **Theme Toggle Button:** A theme toggle button is integrated into the Header component, allowing the UI to dynamically change based on the selected theme.

### Redux and Dataset Management

*   **Redux Store:** A Redux store is set up to manage the application's global state.
*   **Dataset Slice:** A dataset slice handles dataset-related actions and state.
*   **Mock Dataset:** A mock dataset is included for initial data display.
*   **Axios Configuration:** An Axios instance is configured for making API requests.
*   **Dataset Service:** A dataset service is implemented to fetch and manage datasets.
*   **Interceptors:** Interceptors are included for handling API requests and responses.
*   **Dataset Type:** A `Dataset` type is defined for type safety.
*   **Environment Configuration:** Environment variable configuration for development and production environments is added.
*   **Dashboard Integration:** The Dashboard is updated to display data from the Redux store.

### Charts and Visualization

*   **Chart Component:** A `Charts` component has been created to display visualizations.
*   **Chart Styling:** Basic styling has been added for the charts.
*   **App Integration:** The `Charts` component has been integrated into the main `App` component.

### Dataset Table

*   **DatasetTable Component:** A `DatasetTable` component was created to display sample data in a tabular format. This component is located in `src/features/datasets/DatasetTable.tsx`.
*   **Styling:** A corresponding CSS file, `DatasetTable.css`, was created to style the table, including dark theme support.
*   **Integration:** The `DatasetTable` component is now rendered on the "Datasets" page, which is accessible via the `/datasets` route.

## Plugin Generator System

To streamline the creation of new chart plugins and ensure consistency, a plugin generator system has been implemented using `plop`.

### Usage

To create a new chart plugin, run the following command:

```bash
npm run create-plugin
```

You will be prompted to enter the name of the plugin. The generator will then create a new directory for the plugin in `src/features/charts/plugins/` with the following files:

*   `metadata.ts`
*   `controlPanel.ts`
*   `transformProps.ts`
*   `Chart.tsx`
*   `index.ts`

These files will be pre-populated with boilerplate code, ready for you to customize.

## Completed Plan: Scalable API Service Architecture

The user requested to build a scalable API service architecture for the analytics dashboard. This has been completed with the following steps:

### Steps

1.  **Folder Structure:**
    *   Created `src/services/api` for API-related files.

2.  **Environment Configuration:**
    *   Created `.env` files for environment variables.
    *   Created `src/config/env.ts` to expose environment variables to the application.

3.  **Axios Setup:**
    *   Installed `axios`.
    *   Created `src/services/api/axios.ts` to configure a base Axios instance.

4.  **Axios Interceptors:**
    *   Created `src/services/api/interceptors.ts` to handle API requests and responses.

5.  **Dataset API Service:**
    *   Created `src/services/api/dataset.service.ts` to encapsulate all API calls related to datasets.

6.  **Type Definitions:**
    *   Created `src/types/dataset.ts` to define the `Dataset` interface.

7.  **Redux Slice for Datasets:**
    *   Installed `@reduxjs/toolkit` and `react-redux`.
    *   Created `src/features/datasets/datasetSlice.ts` to manage the state for datasets.

8.  **Absolute Imports:**
    *   Updated `tsconfig.json` to allow absolute imports using the `@` alias.

9.  **Redux Store:**
    *   Created `src/store/index.ts` to configure the Redux store.
