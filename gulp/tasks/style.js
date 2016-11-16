module.exports = function (gulp, plugins, config) {
  // 编译 sass
  gulp.task('sass', function() {
    return gulp.src(config.src + '**/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.dist));
  });
};