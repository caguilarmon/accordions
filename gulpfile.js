var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('minifyStyles', function() {
  return gulp.src('./src/css/mr-accordion-styles.css')
  .pipe(csso())
  .pipe(rename({ extname: '.min.css'}))
  .pipe(gulp.dest('./src/css'))
});

gulp.task('minifyScripts', function() {
  return gulp.src('./src/js/mr-accordion.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./src/js'))
});

gulp.task('clean', function() {
  del(['./src/css/*.min.css', './src/js/*.min.js'])
});

gulp.task('default', ['clean'], function() {
  runSequence(
    'minifyStyles',
    'minifyScripts'
  )
});
