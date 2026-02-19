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
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/plugin/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/plugin/controlPanel.ts',
        templateFile: 'plop-templates/plugin/controlPanel.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/index.ts',
        templateFile: 'plop-templates/plugin/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/plugin/metadata.ts',
        templateFile: 'plop-templates/plugin/metadata.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/plugin/transformProps.ts',
        templateFile: 'plop-templates/plugin/transformProps.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/src/images/thumbnail.svg',
        templateFile: 'plop-templates/plugin/thumbnail.svg.hbs',
      },
      {
        type: 'append',
        path: 'src/core/visualization/pluginload.ts',
        template: 'import \'@/features/plugins/custom-plugin-{{kebabCase name}}/src\';',
      },
    ],
  });
};
