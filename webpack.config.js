var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  context: path.resolve(__dirname, './javascripts'),
  entry: ['./index.js', '../scss/main.scss'],
  resolve: {
    modules: [
      path.resolve(__dirname, './javascripts'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/[name].bundle.css',
      allChunks: true,
    })
  ]
};

module.exports = config;
