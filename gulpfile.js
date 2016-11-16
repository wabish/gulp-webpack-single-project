// var fs = require('fs');
// var gulp = require('gulp');
// var cssSpritesmith = require('gulp-css-spritesmith');

// var srcBase = './src';
// var dirs = fs.readdirSync(srcBase);

// dirs = dirs.filter(function(dir) {
//   var stat = fs.statSync(srcBase +'/'+ dir);
//   return stat.isDirectory();
// });

// // register tasks
// dirs.forEach(dir => {
//   gulp.task('sprite_item_' + dir, function() {
//     return gulp.src('./src/' + dir +'/*.css')
//       .pipe(cssSpritesmith({
//         imagepath: './src/' + dir + '/img/sprite',
//         spritedest: './src/' + dir + '/img',
//         spritepath: 'img',
//         padding: 2
//       }))
//       .pipe(gulp.dest('./dist'));
//   });
// });

// gulp.task('sprite', dirs.map(function(dir) {
//   return 'sprite_item_' + dir;
// }));

// gulp.task('default', ['sprite']);

var gulp = require('gulp');

// 顺序执行任务插件
var runSequence = require('run-sequence');

// 配置文件
var config = require('./gulp/gulp.config')();

// 加载插件
var plugins = require('gulp-load-plugins')();

// 子任务列表
var gulpTaskList = require('fs').readdirSync(config.task);

// 遍历子任务
gulpTaskList.forEach(function(taskfile) {
  require(config.task + taskfile)(gulp, plugins, config, runSequence);
});

// 说明帮助
gulp.task('help',function () {
  console.log('******************************************************');
  console.log('*                                                    *');
  console.log('*   # 开发监控                                       *');
  console.log('*     - gulp start                                   *');
  console.log('*                                                    *');
  console.log('*   # 打包上线                                       *');
  console.log('*     - gulp build                                   *');
  console.log('*                                                    *');
  console.log('******************************************************');
});

// 开发监控，处理文件不包括 js 文件
gulp.task('dev', function(cb) {
  runSequence(
    ['clean:dist', 'clean:tmp'],
    ['copy:img', 'sass', 'include'],
    'watch',
    cb
  );
});

// 开发监控
gulp.task('start', plugins.shell.task([
  'concurrently "gulp dev" "gulp webpack"'
]));