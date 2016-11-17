module.exports = function (gulp, plugins, config) {
  // webpack开发
  gulp.task('webpack', plugins.shell.task([
    'webpack --watch --process --colors --config gulp/webpack.config.js'
  ]));

  // webpack打包
  gulp.task('webpack:build', plugins.shell.task([
    'webpack --process --colors --config gulp/webpack.production.config.js'
  ]));

  // 添加js文件版本号
  gulp.task('rev:js', function() {
    return gulp.src(config.tmp + '**/*.js')
      .pipe(plugins.rev())
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(config.tmp + 'rev/js'));
  });
};