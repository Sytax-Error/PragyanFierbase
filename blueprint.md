# Project Blueprint

## Overview

This document outlines the architecture and implementation details of the Pragyan application, a powerful and flexible data visualization tool. It serves as a living document, updated with each significant change to reflect the current state of the project.

## Features and Design

### Core Architecture
- **Visualization Plugin System:** A modular system for registering and rendering different chart types. Core logic is located in `src/core/visualization`.
- **Chart Engine:** A service for running chart queries and returning a renderable component. Located in `src/core/chart-engine`.
- **Theming:** A dark/light mode theme system implemented with CSS variables and the `useTheme` hook.

### Components
- **`EditChartSidebar`:** A collapsible sidebar for configuring chart options.
- **`ControlPanel`:** A component within the sidebar that holds the controls for the selected chart type.
- **`CustomSelect`:** A theme-aware custom select dropdown component.
- **`EditChartMain`:** The main content area for displaying the chart visualization.

### Styling
- **CSS Variables:** The project uses CSS variables for consistent theming and spacing.
- **`card` class:** A reusable class for creating card-like UI elements with a border and background. Its styles are defined in `src/styles/layout.css` and imported globally in `src/main.tsx`.

## Completed Task: Fix Chart Overflow and Scrolling Issue

### Problem Statement
When a chart was created, it appeared to break out of its container (`.edit-chart-main.card`). The component's border and padding were not visible, and the entire page would scroll instead of just the chart area.

### Initial Plan (Incorrect)
The first approach was based on the assumption that the component's internal structure was causing the issue. The plan was to:
1.  Wrap the chart in a new `div`.
2.  Modify the CSS to apply flex properties only to the status message and `overflow: auto` to the new wrapper.
3.  This plan was flawed because it didn't address the root cause.

### Final Resolution

#### Root Cause Analysis
The actual problem was much simpler: the global stylesheet `src/styles/layout.css`, which contains the definition for the `.card` class (including its essential `padding` and `border`), was not being imported into the application. Without these styles, the container had no padding to contain the chart.

#### Solution Implemented
1.  **Global Style Import:** The file `src/main.tsx` was modified to include the missing global layout stylesheet by adding the line: `import '@/styles/layout.css';`.
2.  **Result:** With the global styles correctly loaded, the `.card` class on the `EditChartMain` component now applies the necessary padding. The `overflow: auto` property on `.edit-chart-main` now functions as intended, containing the chart within the card's boundaries and resolving the layout and scrolling bug.
