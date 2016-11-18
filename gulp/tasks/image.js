var fs = require('fs');

module.exports = function (gulp, plugins, config) {
  gulp.task('sprite', function() {
    var dirs = fs.readdirSync(config.tmp);

    dirs = dirs.filter(function(dir) {
      var stat = fs.statSync(config.tmp +'/'+ dir);
      return stat.isDirectory();
    });

    dirs.forEach(function(dir) {
      gulp.src(config.tmp + dir +'/*.css')
        .pipe(plugins.cssSpritesmith({
          imagepath: config.tmp + dir + '/img/sprite',
          spritedest: config.tmp + dir + '/img',
          spritepath: '../' + dir + '/img',
          padding: 2
        }))
        .pipe(gulp.dest('./'));
    });
  });

  // 复制 src 图片到 dist
  gulp.task('copy:img', function() {
    return gulp.src(config.src + '**/*.{png,gif,jpg,jpeg}')
      .pipe(plugins.newer(config.dist))
      .pipe(gulp.dest(config.dist));
  });

  // 复制 src 图片到 tmp
  gulp.task('copy:tmpImg', function() {
    return gulp.src(config.src + '**/*.{png,gif,jpg,jpeg}')
      .pipe(gulp.dest(config.tmp));
  });

  // 压缩图片
  gulp.task('imagemin', function() {
    return gulp.src(config.tmp + '**/*.{png,gif,jpg,jpeg}')
      .pipe(plugins.imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(config.tmp));
  });

  // 添加图片版本号
  gulp.task('rev:img', function() {
    return gulp.src([
        config.tmp + '**/*.{png,gif,jpg,jpeg}',
        '!' + config.tmp + '*/img/sprite/*.{png,gif,jpg,jpeg}'
      ])
      .pipe(plugins.rev())
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(config.tmp + 'rev/img'));
  });
};