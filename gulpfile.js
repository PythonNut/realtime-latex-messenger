var gulp = require('gulp');
var bsync = require('browser-sync').create();
var mosca = require("mosca");
var express = require("express");
var fs = require("fs");

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

gulp.task('express', function() {
  var app = express();
  app.use(express.static(__dirname));
  app.listen('3000', '0.0.0.0');
});

gulp.task('run', ['mqtt', 'express']);
