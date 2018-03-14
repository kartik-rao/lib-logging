var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: "/assets/",
    filename: 'logger.js',
    libraryTarget: "this",
    library: "Logger"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/,
        options: { compilerOptions: { declaration: false } }
      }
    ]
  },
  plugins: [
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT5',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        create_source_map : '[file].map',
      },
      concurrency: 3,
    })
  ]
};