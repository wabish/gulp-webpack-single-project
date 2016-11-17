module.exports = function (gulp, plugins, config) {
  // 编译 sass
  gulp.task('sass', function() {
    return gulp.src(config.src + '*/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.dist));
  });

  // 编译 sass 至 tmp
  gulp.task('sass:tmp', function() {
    return gulp.src(config.src + '*/*.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        cascade: true,
        remove:true
      }))
      .pipe(gulp.dest(config.tmp));
  });

  // 替换已经打包的图片资源
  gulp.task('usemin:css', function() {
    return gulp.src([
      config.tmp + 'rev/**/*.json',
      config.tmp + '*/*.css'
    ])
    .pipe(plugins.revCollector())
    .pipe(gulp.dest(config.tmp));
  });

  // 编译 sass 至 dist
  gulp.task('sass:dist', function() {
    return gulp.src(config.tmp + '*/*.css')
      .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
      .pipe(gulp.dest(config.tmp));
  });

  // 添加 css 文件版本号
  gulp.task('rev:css', function() {
    return gulp.src(config.tmp + '*/*.css')
      .pipe(plugins.rev())
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(config.tmp + 'rev/css'));
  });
};