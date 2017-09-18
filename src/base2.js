/**
 * phaser base2
 *
 * @author wujohns
 * @date 17/9/19
 */
'use strict';

import keyboardjs from 'keyboardjs';

class GameScene {
    constructor () {
        this.game = new Phaser.Game(
            512, 512,
            Phaser.CANVAS, 'phaser',
            {
                preload: this.preload,
                create: this.create
            }
        );
    }

    preload () {

    }

    create () {

    }
}

new GameScene;