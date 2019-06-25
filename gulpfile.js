const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', function (done) {
  nodemon({
    script: 'src/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  , done: done
  })
})