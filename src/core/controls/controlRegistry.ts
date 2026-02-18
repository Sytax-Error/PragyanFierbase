import {
  DataColumnSelector,
  ColorPicker,
  Slider,
} from '@/components';

import type { ComponentType } from 'react';

export interface BaseControlProps {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: any[];
  config?: Record<string, unknown>;
}

/**
 * Registry type
 */
type ControlRegistry = Record<string, ComponentType<any>>;

/**
 * Central control registry
 */
export const CONTROL_REGISTRY: ControlRegistry = {
  'data-column': DataColumnSelector,
  color: ColorPicker,
  slider: Slider,
};