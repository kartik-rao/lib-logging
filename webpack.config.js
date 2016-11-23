var webpack = require('webpack');
var path = require('path');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    path: path.join(__dirname + '/lib'),
    publicPath: "/assets/",
    filename: 'logger.js',
    libraryTarget: "var",
    library: "Logger"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
    ]
  }
};