var fs = require('fs');
var gulp = require('gulp');
var cssSpritesmith = require('gulp-css-spritesmith');

var srcBase = './src';
var dirs = fs.readdirSync(srcBase);

dirs = dirs.filter(function(dir) {
  var stat = fs.statSync(srcBase +'/'+ dir);
  return stat.isDirectory();
});

// register tasks
dirs.forEach(dir => {
  gulp.task('sprite_item_' + dir, function() {
    return gulp.src('./src/' + dir +'/*.css')
      .pipe(cssSpritesmith({
        imagepath: './src/' + dir + '/img/sprite',
        spritedest: './src/' + dir + '/img',
        spritepath: 'img',
        padding: 2
      }))
      .pipe(gulp.dest('./dist'));
  });
});

gulp.task('sprite', dirs.map(function(dir) {
  return 'sprite_item_' + dir;
}));

gulp.task('default', ['sprite']);