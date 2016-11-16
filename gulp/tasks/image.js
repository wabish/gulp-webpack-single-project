module.exports = function (gulp, plugins, config) {
  // 复制 src 图片到 dist
  gulp.task('copy:img', function() {
    return gulp.src(config.src + '**/*.{png,gif,jpg,jpeg}')
      .pipe(plugins.newer(config.dist))
      .pipe(gulp.dest(config.dist));
  });
};