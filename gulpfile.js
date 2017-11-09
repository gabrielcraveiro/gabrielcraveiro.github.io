const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
	gulp.src('assets/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img/**/*'))
);