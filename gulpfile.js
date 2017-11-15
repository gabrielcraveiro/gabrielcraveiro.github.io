var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
  return gulp.src('./assets/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./assets/img/'));
});

gulp.task('sass', function () {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('uglify', function () {
  gulp.src('./assets/js/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('.assets/js'))
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['uglify']);
  gulp.watch(['./assets/css/main.css', './assets/js/*.js'], function (files) {
    livereload.changed(files)
  });
});