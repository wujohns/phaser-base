/**
 * module bundler with simple configure
 */
'use strict';

const packageConfig = {
    // 基础说明配置
    name: 'phaser-base',
    version: '0.0.1',
    author: 'wujohns',
    description: 'learn phaser',
    license: 'MIT',

    /**
     * scripts
     */
    scripts: {
        // test: './node_modules/mocha/bin/mocha ./test/build.test.js'
    },

    engine: {
        node: '>=4.0.0'
    },

    dependencies: {
        // 基础工具
        'lodash': '^4.17.4',
        'async': '^2.5.0',
        'phaser-ce': '^2.8.7',
        'keyboardjs': '^2.3.4'
    },

    devDependencies: {
        'express': '4.15.4',
        'webpack-2b': '^2.0.2',
        'gulp': '~3.9.1',
        'del': '^2.2.2',

        // babel 依赖的包（js）
        'babel-core': '^6.25.0',
        'babel-loader': '^7.1.1',
        'babel-preset-es2015': '^6.24.1',
        'babel-preset-stage-2': '^6.24.1',
        'babel-plugin-transform-decorators-legacy': '^1.3.4',

        // 其他loader（json、image等）
        'json-loader': '^0.5.7',
        'expose-loader': '^0.7.3'
    }
};

const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, './package.json');
fs.writeFileSync(targetFile, JSON.stringify(packageConfig, null, 2), {
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666
});