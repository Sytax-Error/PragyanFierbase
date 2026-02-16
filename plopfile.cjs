module.exports = function (plop) {
  plop.setGenerator('viz-plugin', {
    description: 'Create a new visualization plugin',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Plugin name (e.g. bar-chart, pie-chart). \"custom-plugin-\" will be prepended automatically:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/plugins/custom-plugin-{{kebabCase name}}',
        base: 'plop-templates/plugin',
        templateFiles: 'plop-templates/plugin/*',
      },
      {
        type: 'append',
        path: 'src/features/plugins/index.ts',
        template: 'import \'./custom-plugin-{{kebabCase name}}\';\n',
      },
    ],
  });
};
