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

- **Modular UI System:**
  - **Pluggable Control System:** Implemented a centralized control registry (`src/core/controls/controlRegistry.ts`) that maps control types to their respective React components.
  - **Dynamic Rendering:** Developed a `DynamicControl` component (`src/core/controls/DynamicControl.tsx`) that leverages the registry to render the correct UI elements based on plugin configuration.
  - **Standardized Interface:** All control components now adhere to the `BaseControlProps` interface, ensuring a consistent contract for value management and event handling.
  - **Standardized UI Components:** Control panel components now utilize a standardized, reusable `CustomSelect` component featuring scrollable option lists for handling large datasets.

## Implemented Features

### Collapsible Sidebar

- **Functionality:** Added a collapsible sidebar to the `EditChartPage` to provide more space for the chart preview.
- **Toggle Button:** Implemented a floating toggle button with smooth animations to control the sidebar's visibility.

### Pluggable Control System

- **Control Registry:** Created `controlRegistry.ts` to manage all available sidebar controls (ColorPicker, Slider, DataColumnSelector). This allows for adding new control types globally without modifying page-level code.
- **Sidebar Refactoring:** Updated `EditChartSidebar.tsx` to remove hardcoded `switch` statements. It now dynamically maps over plugin fields and uses `DynamicControl` for rendering, making the sidebar fully pluggable.
- **Prop Normalization:** Standardized how data is passed to controls by aligning the `options` prop across the registry and components, ensuring consistent behavior for data-driven selectors.

### UI & Component Refinements

- **CustomSelect Refinement:** Enhanced the `CustomSelect` component by adding scrollable option lists with a `250px` max-height and modern custom scrollbar styling, preventing dropdowns from extending beyond the viewport.
- **DataColumnSelector Refactoring:** Refactored the `DataColumnSelector` control to utilize the reusable `CustomSelect` component, ensuring visual consistency across all selection UI elements and reducing code duplication.
- **Style Consolidation:** Performed a cleanup of CSS files (e.g., `AddChartPage.css`) by removing redundant selection styles, centralizing look-and-feel management within the core component stylesheets.
- **Button Enhancement:** Updated the `Button` component to correctly handle the `fullWidth` property. It now uses a CSS class (`btn-fullwidth`) rather than passing the property as a custom DOM attribute, resolving React console warnings.

### Code Quality & Linting

- **Resolved Linting Errors:** Systematically addressed all ESLint errors, including:
    - Replaced `any` with `unknown[]` in `controlRegistry.ts` to enforce stricter typing (`@typescript-eslint/no-explicit-any`).
    - Refactore
