const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: process.env.BUILD_TARGET || "./build",
    filename: "index.js",
  },
  resolveLoader: {
    alias: {"svgjsloader": __dirname + "/loaders/svgjsloader"}
  },
  module: {
    loaders: [
      {
        test: /.svg$/, loader: 'svgjsloader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
