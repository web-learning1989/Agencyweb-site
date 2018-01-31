var gulp = require("gulp"),
    watch = require("gulp-watch"),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    mixins= require('postcss-mixins'),
    cssImport = require('postcss-import'),
    sass = require("gulp-sass");


// Html Task
gulp.task("html", function () {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("./temp/dist/"));
});
// style task
gulp.task("sass",function(){
  return gulp.src("src/assets/styles/scss/**/*.scss")
   .pipe(sass().on('error', sass.logError))
   .on('error',function(errorInfo){
       console.log(errorInfo.toString());
        this.emit(end);
   })
   .pipe(gulp.dest('src/assets/styles/css'))
   .pipe(browserSync.stream());
});

gulp.task('postcss',function(){
    var plugins = [cssImport,mixins, cssvars, nested];
    return gulp.src("src/assets/styles/postcss/**/*.css")
    .pipe(postcss(plugins))
    .on('error',function(errorInfo){
        console.log(errorInfo.toString());
        this.emit(end);
    })
    .pipe(gulp.dest('src/assets/styles/css'))
    .pipe(browserSync.stream());
})

// Watch Tasks
gulp.task("watch", function () {
    browserSync.init({
        notify:false,
          server:{
              baseDir:'./src'
          }

    });
    gulp.watch("src/**/*.html", ['html']).on('change',browserSync.reload);
    gulp.watch("src/assets/styles/postcss/**/*.css",['postcss']);
    gulp.watch("src/assets/styles/scss/**/*.scss",['sass']);
});

gulp.task("default",['html','sass','postCss']);