/**
 * phaser-base 编译工作准备
 *
 * @author wujohns
 * @data 17/9/17
 */
'use strict';

const del = require('del');
const gulp = require('gulp');
const webpack2b = require('webpack-2b');

const BBConfig = require('./bbconfig');

// 基础包编译配置
const baseLibsPackConfig = {
    libs: [
        { src: 'lodash', expose: 'lodash' },
        { src: 'async', expose: 'async' },
        { src: 'keyboardjs', expose: 'keyboardjs' }
    ],
    savePath: './dist/base_libs.js'
};
const baseLibsExternals = webpack2b.getExternals(baseLibsPackConfig);

// 单独页面部分
const pagesPackConfig = {
    pages: [
        { name: 'base1', src: ['./src/base1.js'] }
    ],
    destDir: './dist/pages',
    externals: baseLibsExternals
};

gulp.task('libs', (callback) => {
    const webpackConfig = BBConfig.baseLibs({
        uglify: false,
        sourceMap: true
    });
    webpack2b.libsPack(baseLibsPackConfig, webpackConfig, callback);
});

gulp.task('pages', (callback) => {
    const webpackConfig = BBConfig.cusLibsOrPages({
        uglify: false,
        sourceMap: true,
        cacheDir: './node_modules/.pages_cache'
    });
    webpack2b.pagesPack(pagesPackConfig, webpackConfig, callback);
});

gulp.task('dev', ['libs', 'pages']);