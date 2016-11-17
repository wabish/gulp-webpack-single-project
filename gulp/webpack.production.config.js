var path = require('path');
var webpack = require('webpack');
var config = require('./config.js');

module.exports = {
  entry: config.getEntry(),
  output: {
    path: path.join(config.tmp),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
          comments: false,
      },
      compress: {
          warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],
      minChunks: 3
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
};
