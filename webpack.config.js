const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
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
          presets: ['env']
        }
      }
    ]
  }
};
