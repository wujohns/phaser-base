/**
 * phaser base2
 *
 * @author wujohns
 * @date 17/9/19
 */
'use strict';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class GameScene {
    constructor () {
        // TODO 增加渲染部分（update、render，案例：sprites/move a sprite.js）
        this.game = new Phaser.Game(
            512, 512,
            Phaser.CANVAS, 'phaser',
            {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            }
        );
    }

    /**
     * 游戏资源预加载部分
     */
    preload () {
        this.game.load.atlas(
            'atlas',
            '/dist/images/treasureHunter.png',
            '/dist/images/treasureHunter.json'
        );
    }

    /**
     * 游戏中依赖的对象的创建部分
     */
    create () {
        // 地牢
        const dungeon = this.game.add.sprite(0, 0, 'atlas', 'dungeon.png');

        // 探险者
        this.explorer = this.game.add.sprite(0, 0, 'atlas', 'explorer.png');
        this.explorer.x = 68;
        this.explorer.y = this.game.height / 2 - this.explorer.height / 2;

        // 宝箱
        const treasure = this.game.add.sprite(0, 0, 'atlas', 'treasure.png');
        treasure.x = this.game.width - treasure.width - 48;
        treasure.y = this.game.height / 2 - treasure.height / 2;

        // 门
        const door = this.game.add.sprite(32, 0, 'atlas', 'door.png');

        // 史莱姆
        const numberOfBlobs = 6;
        const spacing = 48;
        const xOffset = 150;
        const blobs = [];

        for (let i = 0; i < numberOfBlobs; i++) {
            let blob = this.game.add.sprite(0, 0, 'atlas', 'blob.png');
            blob.x = spacing * i + xOffset;
            blob.y = randomInt(32, this.game.height - blob.height - 32);
            blobs.push(blob);
        }
    }

    /**
     * 帧更新部分
     */
    update () {
        const keyboard = this.game.input.keyboard;
        const leftPress = keyboard.isDown(Phaser.Keyboard.LEFT) ? 1 : 0;
        const rightPress = keyboard.isDown(Phaser.Keyboard.RIGHT) ? 1 : 0;
        const upPress = keyboard.isDown(Phaser.Keyboard.UP) ? 1 : 0;
        const downPress = keyboard.isDown(Phaser.Keyboard.DOWN) ? 1 : 0;

        this.explorer.x += 5 * (rightPress - leftPress);
        this.explorer.y += 5 * (downPress - upPress);
    }

    /**
     * 待确定部分
     */
    render () {
        // TODO
    }
}

new GameScene();