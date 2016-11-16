module.exports = function (gulp, plugins, config, runSequence) {
  // 删除 dist 目录
  gulp.task('clean:dist', function() {
    return gulp.src(config.dist, {read: false})
      .pipe(plugins.clean());
  });

  // 删除 tmp 目录
  gulp.task('clean:tmp', function() {
    return gulp.src(config.tmp, {read: false})
      .pipe(plugins.clean());
  });

  // 监听文件改动，不包括 js 文件
  gulp.task('watch', function() {
    gulp.watch(config.src + '**/*.scss', ['sass']);
    gulp.watch(config.src + '**/*.{png,gif,jpg,jpeg}', ['copy:img']);
    gulp.watch(config.src + '**/*.html', ['include']);
  });

  // // 打包图片
  // gulp.task('build:img', function(cb) {
  //   runSequence(
  //     'sass:tmp',
  //     'copy:tmpImg',
  //     'autoSprite',
  //     'imagemin',
  //     'rev:img',
  //     cb
  //   );
  // });

  // // 打包css文件
  // gulp.task('build:css', function(cb) {
  //   runSequence(
  //     'usemin:css',
  //     'sass:dist',
  //     'rev:css',
  //     cb
  //   );
  // });

  // // 打包js文件
  // gulp.task('build:js', function(cb) {
  //   runSequence(
  //     'webpack:build',
  //     'uglify:libJS',
  //     'rev:js',
  //     cb
  //   );
  // });

  // // 打包html文件
  // gulp.task('build:html', function(cb) {
  //   runSequence(
  //     'include',
  //     'usemin:html',
  //     'min:html',
  //     cb
  //   );
  // });
};
