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
    ['copy:img', 'sass', 'include'],
    'watch',
    cb
  );
});

// 开发监控
gulp.task('start', ['clean:dist', 'clean:tmp'], plugins.shell.task([
  'concurrently "gulp dev" "gulp webpack"'
]));

// 打包上线
gulp.task('build', function(cb) {
  runSequence(
    ['clean:dist', 'clean:tmp'],
    'build:img',
    ['build:css', 'build:js'],
    'build:html',
    'clean:tmp',
    cb
  );
});