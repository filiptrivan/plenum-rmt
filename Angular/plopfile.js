module.exports = function (plop) {
  plop.setHelper('toKebab', function (text) {
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
  });

  plop.setHelper('firstCharToLower', function (text) {
      return text.charAt(0).toLowerCase() + text.slice(1);
  });

  plop.setGenerator('generate-complete', {
    description: 'Generate complete',
    prompts: [
      {
        type: 'input',
        name: 'filenames',
        message: 'Write entity names (comma-separated): ',
      }
    ],
    actions: function (data) {
      const filenames = data.filenames.split(',').map(name => name.trim());
      let actions = [];

      filenames.forEach(filename => {
        actions.push(
          {
            type: 'add',
            path: 'plop/output/{{toKebab filename}}/{{toKebab filename}}-details.component.html',
            templateFile: 'plop/spider-details-html-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{toKebab filename}}/{{toKebab filename}}-details.component.ts',
            templateFile: 'plop/spider-details-ts-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{toKebab filename}}/{{toKebab filename}}-table.component.html',
            templateFile: 'plop/spider-table-html-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{toKebab filename}}/{{toKebab filename}}-table.component.ts',
            templateFile: 'plop/spider-table-ts-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{toKebab filename}}/{{filename}}Controller.cs',
            templateFile: 'plop/spider-controller-cs-template.hbs',
            data: {filename}
          },
        );
      });

      return actions;
    } 
  });
};
