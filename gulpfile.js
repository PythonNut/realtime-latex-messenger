var gulp = require('gulp');
var bsync = require('browser-sync').create();
var mosca = require("mosca");

gulp.task('browser-sync', function() {
  bsync.init({
    server: {
      baseDir: "./"
    },
    open: false
  });
});

gulp.task('watch', ['browser-sync'], function() {
  // gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("*.html").on('change', bsync.reload);
});

gulp.task('mqtt', function() {
  var server = new mosca.Server({
    http: {
      port: 8883,
      bundle: true,
      static: './'
    }
  });
});
