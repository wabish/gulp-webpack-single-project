module.exports = function (gulp, plugins, config) {
  // webpack开发
  gulp.task('webpack', plugins.shell.task([
    'webpack --watch --process --colors --config gulp/webpack.config.js'
  ]));
};