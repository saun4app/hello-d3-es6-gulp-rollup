'use strict';

let gulp = require('gulp');
let gulp_rollup = require('gulp-rollup');
let gulp_htmlmin = require('gulp-htmlmin');
let gulp_concat = require('gulp-concat');
var clean_dest = require('gulp-clean-dest');
let sourcemaps = require('gulp-sourcemaps');
var gulp_sequence = require('gulp-sequence');
let gulp_uglify = require('gulp-uglify');
let rollup = require('rollup');
let rollup_babel = require('rollup-plugin-babel');
let rollup_commonjs = require('rollup-plugin-commonjs');
let rollup_json = require('rollup-plugin-json');
let rollup_eslint = require('rollup-plugin-eslint');
let node_globals = require('rollup-plugin-node-globals');
let node_resolve = require('rollup-plugin-node-resolve');

////////

gulp.task('default', ['build']);
gulp.task('build', gulp_sequence('html', ['rollup', 'css'], 'docs'));

// gulp.task('build', ['rollup', 'css', 'html']);
gulp.task('ugly', ['set_ugly', 'build']);

////////
let npm_pkg = require('./package.json');
let npm_dependencies = Object.keys(npm_pkg.dependencies);

let src_path = 'src';
let build_path = 'build';
let js_src = [src_path, 'js', '**', '*.js'].join('/');
let js_build = [build_path, 'js'].join('/');
let css_build = [build_path, 'css'].join('/');
let is_ugly = false;
let plugin_array = get_plugin_array();

//
gulp.task('set_ugly', function () {
    is_ugly = true;
});

gulp.task('rollup', function () {
    let config_obj = {
        entry: [src_path, 'js', 'main.js'].join('/'),
        format: 'iife',
        moduleName: 'demo_app',
        globals: {
            d3: 'd3'
        },
        external: npm_dependencies,
        plugins: plugin_array
    };

    if (is_ugly) {
        config_obj.plugins.push(rollup_uglify());
        gulp.src(js_src)
            .pipe(gulp_rollup(config_obj))
            .pipe(gulp.dest(js_build));
    } else {
        gulp.src(js_src)
            .pipe(sourcemaps.init())
            .pipe(gulp_rollup(config_obj))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(js_build));
    }
});

gulp.task('css', function () {
    return gulp.src('./src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(gulp_concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css_build));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp_htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(build_path));
});

gulp.task('docs', function () {
    gulp.src([build_path + '/*'])
        .pipe(gulp.dest('docs'));

    gulp.src([js_build + '/*'])
        .pipe(gulp.dest('docs/js'));

    gulp.src([css_build + '/*'])
        .pipe(gulp.dest('docs/css'));
});



//
function get_plugin_array() {
    let plugin_array = [];

    plugin_array.push(node_globals());

    plugin_array.push(node_resolve({
        jsnext: true,
        main: true,
        browser: true
    }));

    plugin_array.push(rollup_commonjs({
            include: [
                'node_modules/**'
            ]
        }
    ));

    plugin_array.push(rollup_eslint({
        exclude: [
            'src/styles/**'
        ]
    }));

    plugin_array.push(rollup_json());
    plugin_array.push(rollup_babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup']
    }));

    return plugin_array;
}