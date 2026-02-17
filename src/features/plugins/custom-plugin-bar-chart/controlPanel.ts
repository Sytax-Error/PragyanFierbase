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
    {
      key: "color",
      label: "Color",
      type: "color",
      defaultValue: "#8884d8",
    },
    {
      key: "barThickness",
      label: "Bar Thickness",
      type: "slider",
      defaultValue: 50,
      config: {
        min: 1,
        max: 100,
        step: 1,
      },
    },
  ],
};
