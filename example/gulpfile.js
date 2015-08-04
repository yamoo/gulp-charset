var gulp = require('gulp');
var charset = require('../');

gulp.task('utf2sjis', function() {
  return gulp.src(['./src/01/**'])
    .pipe(charset({
      to: 'Shift_JIS',
      from: 'UTF-8'
    }))
    .pipe(gulp.dest('./out/01'));
});

gulp.task('sjis2utf', function() {
  return gulp.src(['./src/02/**'])
    .pipe(charset({
      to: 'UTF-8',
      from: 'Shift_JIS'
    }))
    .pipe(gulp.dest('./out/02'));
});

gulp.task('default', [
  'sjis2utf',
  'utf2sjis'
]);