var { parallel, src, dest } = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlclean = require('gulp-htmlclean');
var htmlmin = require('gulp-htmlmin');

// 压缩CSS文件
function minCss(cb) {
    src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(dest('./public'));
    cb();
}

// 压缩JS文件
function minJs(cb) {
    src('./public/**/*.js')
        .pipe(uglify())
        .pipe(dest('./public'));
    cb();
}

// 压缩HTML文件
function minHtml(cb) {
    src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(dest('./public'));
    cb();
}

// 压缩图片
function minImage(cb) {
    src('./source/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(dest('./public/images'));
    cb();
}

exports.build = parallel(minCss, minJs, minHtml, minImage);
exports.default = parallel(minCss, minJs, minHtml, minImage);