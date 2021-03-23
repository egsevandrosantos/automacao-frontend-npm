const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function compilaSass() {
  return gulp
    .src('./css/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        cascade: [false],
      })
    )
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

// gulp.task('default', compilaSass);
// gulp.task('sass', compilaSass);
exports.sass = compilaSass;

function gulpJS() {
  return gulp
    .src('./js/lib/**/*.js')
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
}

// gulp.task('mainjs', gulpJS);
exports.mainjs = gulpJS;

function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

// gulp.task('browser-sync', browser);
exports.browser_sync = browser;

function pluginJS() {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/moment/min/moment.min.js',
      './js/plugins/**/*.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./js'));
}

// gulp.task('pluginjs', pluginJS);
exports.pluginjs = pluginJS;

function watch() {
  gulp.watch('./css/scss/**/*.scss', compilaSass);
  // gulp.watch('./css/scss/**/*.scss', gulp.series('sass', 'abc'));
  // gulp.watch('./css/scss/**/*.scss', gulp.parallel('sass', 'abc'));
  gulp
    .watch(['./**/*.html', './**/*.php', './js/main.js', './js/plugins.js'])
    .on('change', browserSync.reload);
  gulp.watch('./js/lib/**/*.js', gulpJS);
  gulp.watch('./js/plugins/**/*.js', pluginJS);
  //gulp.watch(['./js/**/*.js', '!./js/**/main.js'], gulpJS);
}

// gulp.task('watch-sass', watch);
exports.watch_sass = watch;

// gulp.task(
//   'default',
//   gulp.parallel('watch-sass', 'browser-sync', sass, 'mainjs', 'pluginjs')
// );
exports.default = gulp.parallel(
  this.watch_sass,
  this.browser_sync,
  this.sass,
  this.mainjs,
  this.pluginjs
);
