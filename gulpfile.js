'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webpack = require('gulp-webpack');

gulp.task('browserify-js', function () {
  var b = browserify({
    entries: './src/commonjs/app.js',
    debug: true
  });

  return b.bundle()
  .pipe(source('browserify-bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('webpack-js', function() {
   return gulp.src('src/commonjs/app.js')
   .pipe(webpack({
      output: {
        filename: 'webpack-bundle.js'
      }
   }))
   .pipe(gulp.dest('./dist'));
});
