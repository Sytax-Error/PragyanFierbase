module.exports = function (plop) {
  plop.setGenerator("viz-plugin", {
    description: "Create a new visualization plugin",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Plugin name (e.g. bar, pie, table):",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/features/plugins/{{kebabCase name}}",
        base: "plop-templates/plugin",
        templateFiles: "plop-templates/plugin/*",
      },
    ],
  });
};