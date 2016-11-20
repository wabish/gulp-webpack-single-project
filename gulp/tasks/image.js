var fs = require('fs');

module.exports = function (gulp, plugins, config) {
  var dirs = fs.readdirSync(config.src);

  dirs = dirs.filter(function(dir) {
    var stat = fs.statSync(config.src +'/'+ dir);
    return stat.isDirectory();
  });

  dirs.forEach(function(dir, index) {
    gulp.task('sprite_item_' + dir, function() {
      return gulp.src(config.tmp + dir +'/*.css')
        .pipe(plugins.cssSpritesmith({
          imagepath: config.tmp + dir + '/img/sprite',
          spritedest: config.tmp + dir + '/img',
          spritepath: '../' + dir + '/img',
          padding: 2
        }))
        .pipe(gulp.dest('./'));
    });
  });

  // 雪碧图
  gulp.task('sprite', dirs.map(function(dir) {
    return 'sprite_item_' + dir;
  }));

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