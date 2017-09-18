/**
 * phaser base1
 *
 * @author wujohns
 * @date 17/9/17
 */
'use strict';

const preload = () => {

};

const create = () => {

};

const game = new Phaser.Game(
    256, 256,
    Phaser.CANVAS, 'phaser',
    {
        preload: perload,
        create: create
    }
);
