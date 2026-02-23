import type { ControlPanelField } from "../visualization/types";

export const validateControls = (
  fields: ControlPanelField[],
  controls: Record<string, unknown>
): boolean => {
  for (const field of fields) {
    if (field.validation?.notEmpty) {
      const value = controls[field.key];
      if (value === null || value === undefined || value === "") {
        return false; // Validation fails
      }
    }
  }
  return true; // Validation passes
};
