var gulp = require('gulp');
var charset = require('../');

gulp.task('default', function() {
  return gulp.src(['./src/**'])
    .pipe(charset({
      to: 'EUC-JP'
    }))
    .pipe(gulp.dest('./out'));
});
