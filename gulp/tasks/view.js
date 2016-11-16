module.exports = function (gulp, plugins, config) {
  // html依赖替换
  gulp.task('include', function() {
    return gulp.src(config.src + '**/*.html')
      .pipe(plugins.includeHtml())
      .pipe(gulp.dest(config.dist));
  });
};