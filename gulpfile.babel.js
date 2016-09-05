'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';
import wrench from 'wrench';
import runSequence from 'run-sequence';

const fs = require('fs');
const yaml = require("js-yaml");
const load = yaml.load(fs.readFileSync("./k-task/config.yml"));

// Global 
const plugins = gulpLoadPlugins();

// Create karma server
const KarmaServer = require('karma').Server;

// Create a new browserSync

const defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

// Call Config 
let config = Object.assign({}, load.config, defaultNotification);

// Call ENV 
let setgulp = minimist(process.argv.slice(2));

let target = setgulp.production ? config.dest : config.tmp;

let browserSync = browserSyncLib.create();
// Load Gulp tasks folder
wrench.readdirSyncRecursive('./k-task/task/gulp').filter((file) => {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./k-task/task/gulp/' + file)(gulp, setgulp, plugins, config, target, browserSync);
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.start('k-task');
});

gulp.task('test', ['clean'], () => {
    gulp.start('testing');
});

gulp.task('serve', ['clean'], () => {
    gulp.start('ser');
});

gulp.task('server', ['clean'], () => {
    gulp.start('ser');
});

// Build task
gulp.task('build', ['cleanall'], () => {
    gulp.start('product');
});


// Basic production-ready code
gulp.task('k-task', function(cb) {
    runSequence(
        'sass', // css, less, stylus 
        'concat',
        'babel-concat',
        'jade', // hamber, ejs, pug 
        'copy',
        'fonts',
        cb
    );
});

gulp.task('ser', function(cb) {
    runSequence(
        'k-task',
        'browserSyncPhp',
        'watch',
        cb
    );
});


// Rebuild will call by browserify
gulp.task('product', function(cb) {
    runSequence(
        'k-task',
        // Call new task 
        'favicon',
        'inject-favicon-markups',
        'cssmin',
        'uglify',
        // 'htmlmin',
        // 'imagemin',
        'csscomb',
        'tobase64',
        'rev',
        'delete-css',
        'delete-js',
        'revreplace',
        'done',
        cb
    );
});


// Testing
gulp.task('testing', (done) => {
    new KarmaServer({
        configFile: path.join(__dirname, '/k-task/karma.conf.js'),
        singleRun: !setgulp.watch,
        autoWatch: setgulp.watch
    }, done).start();
});