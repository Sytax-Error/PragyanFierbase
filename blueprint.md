
# Project Blueprint

## Overview

This document outlines the project structure and development plan for the application.

## Implemented Features

### Dynamic Control Panel

*   **ControlPanel Component:** A new `ControlPanel` component was created at `src/components/ControlPanel/ControlPanel.tsx` to provide a consistent and reusable container for chart controls. It includes a title and a content area, and is styled for a clean, modern look.
*   **ColorPicker Control:** A `ColorPicker` component was created at `src/components/controls/ColorPicker/ColorPicker.tsx` to provide a user-friendly way to select colors. This replaces text-based color inputs with an interactive color swatch.
*   **Slider Control:** A `Slider` component was created at `src/components/controls/Slider/Slider.tsx` to provide a way to select a numeric value from a range. It includes a label, the current value, and a range input.
*   **Dynamic Control Rendering:** The `EditChartPage` was refactored to dynamically render controls based on their `type`, as defined in the chart plugin's `controlPanel.ts` file. It now uses a `switch` statement to render the appropriate control component, supporting `color`, `slider`, and default text inputs.
*   **Bar Chart Plugin Update:** The `custom-plugin-bar-chart` was updated to use the new controls. The `color` field now uses the `ColorPicker`, and a new `barThickness` field was added that uses the `Slider` control.

### Universal Design System

*   **Universal Variables:** Created `src/styles/variables.css` to establish a single source of truth for design tokens, including a consistent spacing scale (`--spacing-xs` to `--spacing-xl`), border radii, and a standardized color palette. This ensures visual consistency and simplifies future theme adjustments.
*   **CSS Refactoring:** Refactored all major component stylesheets, including `Dashboard.css`, `MainLayout.css`, and `AddChartPage.css`, to use the newly defined universal variables instead of hardcoded pixel values. This makes the codebase cleaner, more maintainable, and easier to theme.
*   **Layout Utilities:** Introduced `src/styles/layout.css`, which provides a set of reusable utility classes for common layout patterns like `.container`, `.card`, and `.flex-center`. This accelerates development and promotes consistent page structure.

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

### Footer

*   **Footer Component:** A `Footer` component has been created and is located at `src/shared/components/Footer.tsx`.
*   **Styling:** Basic styling, including dark mode support, is provided in `src/shared/components/Footer.css`.
*   **Responsiveness:** The footer is now responsive and will stack vertically on screens smaller than 768px.
*   **Sticky Footer:** The layout has been adjusted to ensure the footer "sticks" to the bottom of the viewport, regardless of content height.
*   **Integration:** The `Footer` is included in the `MainLayout`, making it visible on all pages.

### Plugin Generator System

To streamline the creation of new chart plugins and ensure consistency, a plugin generator system has been implemented using `plop`.

### Refactored Feature Organization

*   **Charts Feature:** The `charts` feature has been restructured to improve organization. Each page (`ChartsPage`, `AddChartPage`) is now located in its own directory within `src/features/charts/pages/`, along with its associated styles and component logic.
*   **Dashboard Feature:** The user's original `Dashboard.tsx` component and its corresponding route have been restored, and the incorrectly generated dashboard files have been removed.

### "Add Chart" Page UI/UX Refinements

*   **Sticky Layout:** Corrected the application's main layout to ensure the header and footer are always visible (sticky), while the content area scrolls independently. This required updating `MainLayout.css` to be the source of truth for the layout and removing conflicting styles from page-specific CSS files.
*   **Button Placement:** The "Create new chart" button on the "Add Chart" page has been moved to the bottom of the "Step 2: Choose chart type" card. This places the primary action in a more intuitive and contextually relevant location for the user.
*   **Search Functionality:** The chart gallery includes a working search bar that filters the list of available chart types in real-time as the user types.

### SubHeader Component

*   **SubHeader Component:** A new `SubHeader` component has been created at `src/shared/components/SubHeader/SubHeader.tsx` to provide a consistent secondary header across different pages.
*   **SubHeader Context:** A `SubHeaderContext` (`src/context/SubHeaderContext.tsx`) and a `useSubHeader` hook (`src/hooks/useSubHeader.ts`) have been implemented to allow pages to dynamically set the content of the `SubHeader`.
*   **Integration:** The `SubHeader` is integrated into the `MainLayout` and its content is controlled by the current page using the `useSubHeader` hook.
*   **Charts Page Integration:** The "Charts" page (`src/features/charts/ChartsPage/ChartsPage.tsx`) has been refactored to use the `SubHeader` to display the page title and action buttons.

### "Add Chart" Page Layout Overhaul

*   **App-Like Layout:** Re-architected the `AddChartPage` to have a fixed, non-scrolling viewport.
*   **Contained Scrolling:** The chart gallery (`Step 2`) is now the single, scrollable area on the page, ensuring the dataset selection and footer action button remain persistently visible.
*   **Centered, Max-Width Content:** The entire page content is now constrained to a maximum width of `1200px` and centered, dramatically improving readability and visual appeal on wider screens.
*   **Header-Aligned Footer:** The footer's height has been explicitly set to `60px` to perfectly match the main application header's height, creating a consistent and professional rhythm throughout the application.
*   **Robust Vertical Sizing:** The layout uses modern CSS flexbox properties (`flex-grow`, `flex-shrink`) to intelligently manage vertical space, preventing the unnatural stretching of components and creating a balanced, desktop-app-like feel.
