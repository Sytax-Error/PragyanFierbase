export const controlPanel = {
  fields: [
    {
      key: "dimension",
      label: "Dimension",
      type: "data-column",
      kind: "dimension", // <-- Specifies that this control expects a categorical column
      defaultValue: "",
    },
    {
      key: "measure",
      label: "Measure",
      type: "data-column",
      kind: "measure", // <-- Specifies that this control expects a numerical column
      defaultValue: "",
    },
  ],
};
