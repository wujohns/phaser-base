/**
 * phaser-base 的 webpack 配置相关
 *
 * @author wujohns
 * @date 17/9/10
 */
'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

class BBConfig {
    /**
     * 基础包打包配置
     * @param {Object} config - 简化配置
     * @param {Boolean} config.uglify - 是否压缩
     * @param {Boolean} config.sourceMap - 是否启用 sourceMap
     * @returns {Object} - 相应的webpack配置
     */
    static baseLibs (config) {
        const plugins = [];
        if (config.uglify) {
            plugins.push(new UglifyJsPlugin());
        }
        // 将 pixi、p2、phaser 暴露在全局变量中
        const rules = [
            {
                test: require.resolve('phaser-ce/build/custom/pixi.js'),
                use: [{
                    loader: 'expose-loader',
                    options: 'PIXI'
                }]
            },
            {
                test: require.resolve('phaser-ce/build/custom/p2.js'),
                use: [{
                    loader: 'expose-loader',
                    options: 'p2'
                }]
            },
            {
                test: require.resolve('phaser-ce/build/custom/phaser-split.js'),
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser'
                }]
            }
        ];
        const webpackConfig = {
            module: {
                rules: rules
            },
            plugins: plugins
        };
        if (!!config.sourceMap) {
            webpackConfig.devtool = 'inline-source-map';
        }
        return webpackConfig;
    }

    /**
     * 自定义包/页面 打包配置
     * @param {config} - 简化配置
     * @param {Boolean} - config.uglify - 是否压缩
     * @param {Boolean} - config.sourceMap - 是否使用sourceMap
     * @param {String} - config.cacheDir - 缓存目录
     * @returns {Object} - 相应的webpack配置
     */
    static cusLibsOrPages (config) {
        const plugins = [];
        if (config.uglify) {
            plugins.push(new UglifyJsPlugin());
        }
        const jsRule = {
            test: /\.js?$/,
            exclude: [path.resolve(process.cwd(), 'node_modules')],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: path.join(process.cwd(), config.cacheDir),
                        presets: ['es2015', 'stage-2'],
                        plugins: ['transform-decorators-legacy'],
                        sourceMap: !!config.sourceMap
                    }
                }
            ]
        };
        const jsonRule = {
            test: /\.json$/,
            use: ['json-loader']
        };
        const webpackConfig = {
            module: {
                rules: [jsRule, jsonRule]
            },
            plugins: plugins
        };
        if (!!config.sourceMap) {
            webpackConfig.devtool = 'inline-source-map';
        }
        return webpackConfig;
    }
}

module.exports = BBConfig;