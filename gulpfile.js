'use strict';

// Декларирование переменных
var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var del = require('del'); 	
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var inlineImages = require('gulp-inline-images');
var srcset = require('gulp-sugar-srcset');
var browserSync = require('browser-sync');

/**
 *
 * Block comment
 *
 */


// Default задача
gulp.task('default', function (callback) {
  runSequence(['sass', 'main-js', 'html', 'browserSync'], 'watch',
    callback
  )
})

// Watch
gulp.task('watch', function(){
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/templates/**/*.html', ['html']);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
})

// Build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'images',
    'html',
    'vendor-css',
    'sass',
    'vendor-js',
    'main-js',
    'fonts',
    callback
  )
})


/**
 *
 * Таски для сборки Dist и оптимизации
 *
 */

// Работа с Vendor css файлами
gulp.task('vendor-css', function() {
    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/normalize-css/normalize.css',
        './bower_components/slick-carousel/slick/slick.css',
        './bower_components/slick-carousel/slick/slick-theme.css'
    ]) // файлы, которые обрабатываем
    .pipe(gulp.dest('./dist/vendor/css'))
});

// Работа с CSS файлами
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
  	.pipe(sass().on('error', sass.logError)) 
  	.pipe(autoprefixer({ // Добавляем вендорные префиксы
            browsers: ['last 2 versions'],
            cascade: false,
            flexbox: true
    }))
  	.pipe(concatCss("main.css")) // Объединяем css файлы в один
    .pipe(gulp.dest('./src/css')) // Складываем их в папку src/css
    .pipe(gulp.dest('./dist/css')) // Складываем в папку dist/css
    .pipe(cleanCSS({compatibility: 'ie10'})) // IE10
    .pipe(rename({ extname: '.min.css' })) // Переименование минифицированного app.css в папку
    .pipe(gulp.dest('./dist/css/min')) // Ложим финальный css файл в папку dist/css
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Bootstrap
gulp.task('sass:bootstrap', function () {
	return gulp.src('./bower_components/bootstrap/scss/**/*.scss')
  	.pipe(sass().on('error', sass.logError)) 
  	.pipe(autoprefixer({ // Добавляем вендорные префиксы
            browsers: ['last 2 versions'],
            cascade: false,
            flexbox: true
    }))

  	.pipe(concatCss("bootstrap.css")) // Объединяем css файлы в один
    .pipe(gulp.dest('./dist/vendor/css')) // Складываем в папку dist/css
    .pipe(cleanCSS({compatibility: 'ie10'})) // IE10
    .pipe(rename({ extname: '.min.css' })) // Переименование минифицированного app.css в папку
    .pipe(gulp.dest('./dist/vendor/css/min')) // Ложим финальный css файл в папку dist/css
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Работа с Vendor JS файлами
gulp.task('vendor-js', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/jquery-mask-plugin/dist/jquery.mask.min.js',
        './bower_components/jquery-validation/dist/jquery.validate.min.js',
        './bower_components/tether/dist/js/tether.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/slick-carousel/slick/slick.min.js'
    ])
    .pipe(gulp.dest('./dist/vendor/js'))
});

// Таск для main.js проекта
gulp.task('main-js', function (cb) {
    pump([
        gulp.src('./src/js/main.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

// Работа со Шрифтами
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*.+(woff2|woff|ttf|otf|eot|svg)')
    .pipe(gulp.dest('./dist/fonts'))
});

// Сборщик HTML из Pug
gulp.task('html', function buildHTML() {
  return gulp.src('./src/templates/*.html')
      .pipe(pug({
        pretty: true
      }))
      // .pipe(inlineImages({}))
      .pipe(srcset({
      	responsive: { src: true },
      	resolution: { pixelRatio: [1,2] }, 
      }))
      .pipe( gulp.dest('./dist/') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

// Минифицируем изображения
gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg|ico)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.reload({
        stream: true
   }));
});

// Очищаем папку dist кроме изображений
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*', '!dist/fonts', '!dist/fonts/**/*']);
});

// Live reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})
