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
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/plugin/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/controlPanel.ts',
        templateFile: 'plop-templates/plugin/controlPanel.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/index.ts',
        templateFile: 'plop-templates/plugin/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/metadata.ts',
        templateFile: 'plop-templates/plugin/metadata.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/features/plugins/custom-plugin-{{kebabCase name}}/transformProps.ts',
        templateFile: 'plop-templates/plugin/transformProps.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/features/plugins/index.ts',
        template: 'import \'./custom-plugin-{{kebabCase name}}\';',
      },
    ],
  });
};
