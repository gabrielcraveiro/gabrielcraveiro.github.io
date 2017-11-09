const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
  gulp.src('assets/img/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({
      interlaced: true
    }),
    imagemin.jpegtran({
      progressive: true
    }),
    imagemin.optipng({
      optimizationLevel: 7
    }),
    imagemin.svgo({
      plugins: [{
          removeViewBox: true
        },
        {
          cleanupIDs: false
        }
      ]
    })
  ], {
    verbose: true
  }))
  .pipe(gulp.dest('assets/img'))
);