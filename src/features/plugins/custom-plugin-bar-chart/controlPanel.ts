export const controlPanel = {
  fields: [
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
