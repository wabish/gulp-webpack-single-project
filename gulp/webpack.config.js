var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(process.cwd());
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');

// 获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
  var dirs = fs.readdirSync(SRC_PATH);
  var matchs = [], 
      files = {};

  dirs.forEach(function(item) {
    var jsPath = path.resolve(SRC_PATH, item);
    var itemDirs = fs.readdirSync(jsPath);

    itemDirs.forEach(function(jsItem) {
      matchs = jsItem.match(/(.+)\.js$/);

      if (matchs) {
        files[item + '/' + matchs[1]] = path.resolve(jsPath, jsItem);
      }
    });
  });

  return files;
}

// 加入vendor
function addVendor() {
  var files = getEntry();
  files['vendor'] = [
    'jquery'
  ];

  return files;
}

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  entry: addVendor(),
  output: {
    path: path.join(DIST_PATH),
    filename: '[name].js'
  },
  module: {
    preLoaders: [{
      test: /\.js?$/,
      exclude: [
        /node_modules/
      ],
      loader: 'jshint-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  jshint: {
    camelcase: true,
    eqeqeq: true,
    undef: true,
    browser: true,
    devel: true
  },
  plugins: [
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
