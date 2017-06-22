var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('server', function(){
  server.run(['app.js']);

  // restart the server when app.js changes
  gulp.watch(['app.js', 'server/model/*.js','server/*.js'], server.run);
})

gulp.task('default',['server'])