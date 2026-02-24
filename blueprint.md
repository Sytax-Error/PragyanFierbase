# Project Blueprint

## Overview

This document outlines the architecture and implementation details of the Pragyan application, a powerful and flexible data visualization tool. It serves as a living document, updated with each significant change to reflect the current state of the project.

## Current Task: Refactor Create/Edit Flow

### Problem Statement
The previous implementation for creating and editing charts was complex. A single `EditChartPage` component was responsible for both workflows, determined by the URL parameters. This led to convoluted routing and a component with high internal complexity.

### Solution: Separate Create and Edit Pages
To simplify the architecture, we are refactoring the application to use distinct pages and routes for each workflow:

1.  **`AddChartPage` (`/add-chart`):** A wizard page where the user selects a dataset and a chart type.
2.  **`CreateChartPage` (`/charts/create/:datasetId/:chartType`):** A new, dedicated page that takes the dataset and chart type from the URL and handles the entire creation and configuration process for a *new* chart.
3.  **`EditChartPage` (`/charts/edit/:chartId`):** A refactored page that is solely responsible for fetching an existing chart by its ID, allowing modification, and saving the updates.

This change will simplify the components, clarify the routing, and align the codebase with the "Single Responsibility Principle."

---

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
- **`SaveConfirmationDialog`**: A modern, animated dialog that confirms the successful saving of a chart. It provides options for the user to either continue editing or navigate back to the charts list. The dialog features a "glassmorphism" overlay, a "lifted" card design, and interactive "glow" effects on buttons to align with the project's premium design guidelines.

### Styling
- **CSS Variables:** The project uses CSS variables for consistent theming and spacing.
- **`card` class:** A reusable class for creating card-like UI elements with a border and background. Its styles are defined in `src/styles/layout.css` and imported globally in `src/main.tsx`.
