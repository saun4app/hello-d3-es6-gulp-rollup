'use strict';

var rollup_babel = require('rollup-plugin-babel');
var rollup_commonjs = require('rollup-plugin-commonjs');
var rollup_json = require('rollup-plugin-json');
var rollup_multi_entry = require('rollup-plugin-multi-entry');
var node_globals = require('rollup-plugin-node-globals');
var node_resolve = require('rollup-plugin-node-resolve');

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get_plugin_array = get_plugin_array;

function get_plugin_array(is_ugly = false) {
    var plugin_array = [];

    plugin_array.push(rollup_multi_entry());

    plugin_array.push(node_resolve({
        jsnext: true,
        main: true,
        browser: true
    }));

    plugin_array.push(rollup_commonjs({
        include: ['node_modules/**']
    }));

    plugin_array.push(rollup_json());
    plugin_array.push(rollup_babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup']
    }));

    if (is_ugly) {
        plugin_array.push(rollup_uglify());
    }

    return plugin_array;
}