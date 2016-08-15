// Include gulp
var gulp = require('gulp'),

// Include Our Plugins 
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	rename = require('gulp-rename');

// Lint Task 
gulp.task('lint', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Server 
gulp.task('connect', function(){
	connect.server({
		livereload: true
	});
})

// Reload on html
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// Compile sass
gulp.task('sass', function(){
	return gulp.src('sass/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(uglifycss())
		.pipe(concat('common.css'))
		.pipe(gulp.dest('public/css'))
    	.pipe(connect.reload());

})

// Concatenate minified angular core files
gulp.task('js-libs', function(){
	return gulp.src([
			'node_modules/angular/angular.min.js',
			'node_modules/angular-route/angular-route.min.js',
			'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
			'node_modules/ng-sortable/dist/ng-sortable.min.js',
			'node_modules/chart.js/dist/Chart.min.js',
			'node_modules/angular-chart.js/dist/angular-chart.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('public/js'))
})


// Concatenate & minify JS
gulp.task('js-custom', function(){
	return gulp.src([
			'js/angular/list/list.module.js',
			'js/angular/list/list.component.js',
			'js/angular/graph/graph.module.js',
			'js/angular/graph/graph.component.js',
			'js/angular/ball/ball.module.js',
			'js/angular/ball/ball.component.js',
			'js/angular/app.module.js',
			'js/angular/app.config.js'
		])
		.pipe(concat('custom.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(connect.reload());
})

// Watch Files for Changes 
gulp.task('watch', function(){
	gulp.watch('*.html', ['html']);
	gulp.watch('js/*.js', ['lint', 'ng-custom', 'scripts']);
	gulp.watch('sass/*.scss', ['lint', 'sass']);
})


gulp.task('default', ['lint', 'connect', 'sass', 'js-libs', 'js-custom', 'watch']);