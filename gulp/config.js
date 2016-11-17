var path = require('path');
var fs = require('fs');

var ROOT_PATH = path.resolve(process.cwd());
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var TMP_PATH = path.resolve(ROOT_PATH, 'tmp');

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

var config = {
  src: SRC_PATH,            // 开发目录
  dist: DIST_PATH,          // 打包目录
  tmp: TMP_PATH,            // 临时构建目录

  getEntry: function() {
    var files = getEntry();
    files['vendor'] = [
      'jquery'
    ];

    return files;
  }
};

module.exports = config;