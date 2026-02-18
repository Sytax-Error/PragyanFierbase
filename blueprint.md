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

## Implemented Features

### Pluggable Control System

*   **Control Registry:** Created `controlRegistry.ts` to manage all available sidebar controls (ColorPicker, Slider, DataColumnSelector). This allows for adding new control types globally without modifying page-level code.
*   **Sidebar Refactoring:** Updated `EditChartSidebar.tsx` to remove hardcoded `switch` statements. It now dynamically maps over plugin fields and uses `DynamicControl` for rendering, making the sidebar fully pluggable.
*   **Prop Normalization:** Standardized how data is passed to controls by aligning the `options` prop across the registry and components, ensuring consistent behavior for data-driven selectors.

## Visual Enhancements Plan

1.  **Review Existing Styles:** I'll start by examining the current CSS to understand the existing design system, including colors, spacing, and component styles. This will help me identify areas for improvement and ensure that my changes are consistent with the current design language.

2.  **Modernize the Color Palette:** I'll introduce a new color palette that is more vibrant and modern. I will define a set of primary, secondary, and accent colors that will be used throughout the application.

3.  **Improve Typography:** I'll select a new set of fonts that are clean, legible, and visually appealing. I'll also establish a clear typographic hierarchy to improve readability and guide the user's attention.

4.  **Enhance Component Styling:** I'll update the styling of the application's components, such as buttons, cards, and forms, to give them a more modern and polished look. This will include adding subtle animations and transitions to improve the user experience.

5.  **Introduce a "Glassmorphism" Effect:** To create a sense of depth and hierarchy, I'll apply a "glassmorphism" effect to the application's main content area. This will involve using a blurred background with a semi-transparent overlay to create a frosted glass effect.