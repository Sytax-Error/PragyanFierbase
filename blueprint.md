
# Project Blueprint

## Overview

This document outlines the project structure, design, and features of the application. It serves as a single source of truth for the application's current state and future development plans.

## Project Structure

The project is a React application built with Vite, using a standard project structure. The main entry point is `src/main.tsx`, and the application's routes are defined in `src/app/routes/routes.tsx`.

## Implemented Features

- **Dashboard Management:**
  - **Dashboard List:** A page to display a list of all dashboards.
  - **Add Dashboard:** A powerful dashboard composition tool. This page features a sidebar with a list of available charts and an interactive grid canvas. Users can add, arrange, resize, and remove charts to build a new dashboard. The system prevents duplicate charts from being added to the same dashboard.
  - **Edit Dashboard:** A page for editing the name of an existing dashboard.
  - **Dashboard Detail:** A page to view the details of a specific dashboard.
- **Chart Management:**
  - **Chart List:** A page to display a list of all charts.
  - **Add Chart:** A wizard-style interface for creating new charts.
  - **Create Chart:** A page to create a new chart from a dataset.
  - **Edit Chart:** A page to edit an existing chart.
- **Dataset Management:**
  - **Dataset Table:** A page to display a table of all datasets.

## Current Plan

The current implementation provides a clear separation of concerns:

- The `AddDashboardPage` is a full-featured dashboard composition tool, allowing users to build dashboards by selecting, arranging, resizing, and removing pre-existing charts on an interactive grid.
- The `AddChartPage` provides a step-by-step wizard for creating individual charts.

This approach ensures a streamlined and intuitive workflow for both creating and managing dashboards and charts.
