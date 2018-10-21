var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlclean = require('gulp-htmlclean');
var htmlmin = require('gulp-htmlmin');

// 压缩CSS文件
gulp.task('min-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

// 压缩JS文件
gulp.task('min-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

// 压缩HTML文件
gulp.task('min-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'));
});

// 压缩图片
gulp.task('min-image', function() {
    return gulp.src('./source/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('build', ['min-css', 'min-html', 'min-image', 'min-js']);

gulp.task('default', ['min-css', 'min-html', 'min-image', 'min-js'], function() {
    gulp.watch('./public/**/*.css', ['min-css']);
    gulp.watch('./public/**/*.js', ['min-js']);
    gulp.watch('./public/**/*.html', ['min-html']);
    gulp.watch('./source/images/*.*', ['min-image']);
});