let gulp = require('gulp');
let gulpSass = require('gulp-sass');
let gulpAutoPreFixer = require('gulp-autoprefixer');
let gulpClean = require('gulp-clean');
let gulpCleanCss = require('gulp-clean-css');
let gulpConcat = require('gulp-concat');
let gulpImageMin = require('gulp-imagemin');
let gulpUglify = require('gulp-uglify');
let browserSync = require('browser-sync').create();
let gulpRename = require('gulp-rename');
let webpack = require('webpack-stream');
let ifElse = require('gulp-if-else');

let isDevelopment = false;

let webPackConfig = {
    output:{
        filename: 'scripts.min.js'
    },
    module:{
        rules:[
            {
                test:/\.js/,
                loader:'babel-loader',
            }
        ]
    },
    mode:isDevelopment?'development':'production',
    devtool:isDevelopment?'eval-source-map':'none'
};

gulp.task('sass',function () {
    return gulp
        .src('src/style/main.scss')
        .pipe(gulpSass()) //компиляция scss файлов в css //конкатенация css файлов в один
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulpCleanCss())//минификация итоговых css файлов
        .pipe(gulpAutoPreFixer([
            'last 15 versions',
            '> 1%',
            'ie 8',
            'ie 7'
        ],{
            cascade:true
        }))//добавление вендорных префиксов к CSS свойствам
        .pipe(gulpRename('styles.min.css'))
        .pipe(gulp.dest('build/style'))//копирование минифицированных css файлов в папку dist
        .pipe(browserSync.reload({
            stream:true
        }));
});

//такска для скрипта поумнее, сборка файла происходит благодаря webpack
gulp.task('script',function () {
    return gulp.src('src/index.js')
        .pipe(webpack(webPackConfig))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('img',function () { //оптимизация картинок и копирование их в папку dist
    return gulp.src('src/img/**/*')
        .pipe(ifElse(!isDevelopment, gulpImageMin))
        .pipe(gulp.dest('build/img/'))
});

gulp.task('font',function () {
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('build/font'))
});

//очистка папки dist
gulp.task('cleanFolder',function () {
    return gulp.src('build/*',{read:false})
        .pipe(gulpClean({force:true}))
});

gulp.task('dev',function () {//Запуск сервера и последующее отслеживание изменений *.js и *.scss файлов в папке src
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //При изменении - пересборка и копирование объединенного и минифицированного файла styles.min.css или script.min.js в папку dist, перезагрузка страницы
    gulp.watch("src/style/**/*.scss", gulp.series('sass'));
    gulp.watch('src/*.js',gulp.series('script'));
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build',gulp.series('cleanFolder','sass','script','img','font','dev'));

gulp.task('default',gulp.series('build'));