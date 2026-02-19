# Project Blueprint

## Overview

This document outlines the architecture and implementation details of the Pragyan application, a powerful and flexible data visualization tool. It serves as a living document, updated with each significant change to reflect the current state of the project.

## Core Refactoring: Phase 1

**Date:** 2024-07-25

### Objective

To improve the project's structure, maintainability, and scalability by refactoring core logic out of the `features` directory and into a more appropriate `core` directory. This change clarifies the separation between application features (like specific charts or pages) and the underlying systems that power them.

### Changes Implemented

1.  **Relocated Visualization Plugin System:**
    *   **Action:** Moved the core plugin logic from `src/features/plugins` to `src/core/visualization`.
    *   **Files Moved:** `createPlugin.ts`, `registry.ts`, `types.ts`.
    *   **New Structure:** Introduced a centralized `index.ts` in the new directory for clean, unified exports.
    *   **Impact:** All imports related to the plugin system were updated to use the new, more robust absolute path: `@/core/visualization`.

2.  **Relocated Chart Engine:**
    *   **Action:** Moved the chart execution logic from `src/features/chartEngine` to `src/core/chart-engine`.
    *   **Files Moved:** `runChart.ts`.
    *   **New Structure:** Created a new `index.ts` to provide a clean export for the `runChart` function.
    *   **Impact:** The `EditChartPage` component was updated to import `runChart` from the new `@/core/chart-engine` path.

3.  **Dependency & Import Cleanup:**
    *   All affected files, including `AddChartPage.tsx`, `EditChartPage.tsx`, the `bar-chart` plugin, and the `plop` template, were updated to use the new absolute import paths.
    *   The original, now-empty directories (`src/features/plugins` and `src/features/chartEngine`) were removed.

### Rationale

This refactoring establishes a clear and logical separation of concerns within the codebase. By isolating core functionalities, we make the system easier to understand, test, and extend. This foundational work is crucial for the long-term health and scalability of the Pragyan application.
