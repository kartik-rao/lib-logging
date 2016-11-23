var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {
  return {
    setup: function () {
      window.__moduleBundler.loadTests();
    },
    files: [
      { pattern: 'src/**/*.ts', load: false }
    ],
    tests: [
       { pattern: 'test/spec.index.ts', load: false }
    ],
    testFramework: 'jasmine',
    postprocessor: wallabyWebpack({}),
    middleware: (app, express) => {
      app.use('/assets',
        express.static(require('path').join(__dirname, 'public')));
      console.log(require('path').join(__dirname, 'public'));
    },
    workers: {
       initial: 6,
       regular: 2
    }
  };
};