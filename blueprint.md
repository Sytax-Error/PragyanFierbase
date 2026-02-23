# Project Blueprint

## Overview

This document outlines the architecture and implementation details of the Pragyan application, a powerful and flexible data visualization tool. It serves as a living document, updated with each significant change to reflect the current state of the project.

## Features and Design

### Core Architecture
- **Visualization Plugin System:** A modular system for registering and rendering different chart types. Core logic is located in `src/core/visualization`.
- **Chart Engine:** A service for running chart queries and returning a renderable component. Located in `src/core/chart-engine`.
- **Theming:** A dark/light mode theme system implemented with CSS variables and the `useTheme` hook.
- **State Management:** The application uses Redux Toolkit for state management.
  - **`charts` slice:** Manages the list of saved charts and is persisted to local storage using `redux-persist`.
  - **`chartEditor` slice:** Manages the temporary state of the chart being edited. This slice is not persisted.

### Components
- **`EditChartSidebar`:** A collapsible sidebar for configuring chart options.
- **`ControlPanel`:** A component within the sidebar that holds the controls for the selected chart type.
- **`CustomSelect`:** A theme-aware custom select dropdown component.
- **`EditChartMain`:** The main content area for displaying the chart visualization.
- **`SubHeaderActions`:** A component in the sub-header that contains the "Save" button.

### Styling
- **CSS Variables:** The project uses CSS variables for consistent theming and spacing.
- **`card` class:** A reusable class for creating card-like UI elements with a border and background. Its styles are defined in `src/styles/layout.css` and imported globally in `src/main.tsx`.

## Completed Task: Implement Chart Saving

### Problem Statement
The "Save" button in the chart editor was not functional. It only logged a message to the console and did not save the chart.

### Solution Implemented
1.  **`chartEditorSlice` Creation**: A new Redux slice, `chartEditorSlice`, was created to hold the temporary state of the chart being edited. This decouples the editor's state from the `EditChartPage` component.
2.  **Store Integration**: The new slice was added to the Redux store, but it is explicitly excluded from `redux-persist` to avoid saving incomplete charts.
3.  **State Synchronization**: The `EditChartPage` was updated to dispatch actions to the `chartEditorSlice`, keeping the editor's state in Redux.
4.  **Save Button Logic**: The `SubHeaderActions` component was modified. The "Save" button now reads the chart's data from the `chartEditorSlice`, creates a new chart object, and dispatches the `addChart` action to save it.
5.  **Type Safety**: The `Chart` interface was updated to include the `controls` property, ensuring type safety when saving charts.
6.  **Navigation**: After saving, the user is redirected to the `/charts` page to see their newly saved chart.
