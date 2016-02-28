const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tsconfig = require('tsconfig-glob');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tslint = require('gulp-tslint');

gulp.task('app', function() {
  browserSync({ server: { baseDir: '.' } });
});

gulp.task('serve', ['build'], function() {
  browserSync({ server: { baseDir: 'dist' } });
  gulp.watch(['src/**/*'], ['buildAndReload']);
});
gulp.task('build', ['tslint', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);

gulp.task('start', function() {
  browserSync({ server: { baseDir: 'dist' } });
  gulp.watch(['src/**/*'], ['buildAndReload']);
});


gulp.task('clean', ['tsconfig-glob'], function () {
  console.log('Deleting the contents of the distribution directory');
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())          // <--- sourcemaps
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      // <--- sourcemaps
    .pipe(gulp.dest('dist/app'));
});
// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['src/**/*', '!src/**/*.ts'], { base : './src' })
    .pipe(gulp.dest('dist'))
});
// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest('dist/lib'))
});

//rewrite tsconfig.json file
gulp.task('tsconfig-glob', function () {
  return tsconfig({ configPath: '.', indent: 2 }); });

gulp.task('tslint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({}))
    .pipe(tslint.report('verbose'));
});