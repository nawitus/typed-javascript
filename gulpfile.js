// Simple Gulpfile
var gulp = require('gulp');
var gutil = require('gulp-util');

// Gulp plugins
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', function(){
      // Mocha tests
      gulp.src('test/**/*.js')
        .pipe(mocha({reporter: 'spec'}));

      // JSHint, also tests this very file
      gulp.src(['*.js', 'test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
