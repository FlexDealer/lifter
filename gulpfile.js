var gulp = require('gulp'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('build:js', function() {
	return gulp.src('src/lifter.js')
    		   .pipe( babel({ presets: ['es2015'] }) )
			   .pipe( uglify() )
			   .pipe( rename({ suffix: '.min' }) )
        	   .pipe( gulp.dest('dist') );
});

gulp.task('build:css', function() {
	return gulp.src('src/lifter.css')
			   .pipe( autoprefixer({ browsers: ['last 2 versions'], cascade: false }) )
			   .pipe( cssnano() )
			   .pipe( rename({ suffix: '.min' }) )
        	   .pipe( gulp.dest('dist') );
});

gulp.task('build', ['build:js', 'build:css']);

gulp.task('default', ['build']);
