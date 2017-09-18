/**
 * phaser base1
 *
 * @author wujohns
 * @date 17/9/17
 */
'use strict';

class GameScene {
    constructor () {
        this.game = new Phaser.Game(
            256, 256,
            Phaser.CANVAS, 'phaser',
            {
                preload: this.preload,
                create: this.create
            }
        );
    }

    preload () {
        this.game.load.image('cat', '/dist/images/cat.png');
        this.game.load.image('blob', '/dist/images/blob.png');
        this.game.load.image('explorer', '/dist/images/explorer.png');
    }

    create () {
        const cat = this.game.add.sprite(0, 0, 'cat');
        const blob = this.game.add.sprite(82, 82, 'blob');
        const explorer = this.game.add.sprite(128, 128, 'explorer');

        // 重新设定 anchor 后会绘制图片时起点变为了 anchor，这里设定位置进行弥补
        cat.x = 64;
        cat.y = 64;

        // 确定旋转中心并旋转（anchor.x 与 anchor.y 默认为 0，也就是左上角）
        cat.anchor.x = 1;
        cat.anchor.y = 1;
        cat.rotation = 0.3;
    }
}

new GameScene();
