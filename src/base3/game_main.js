/**
 * 主场景部分
 *
 * @author wujohns
 * @date 17/9/20
 */
'use strict';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class GameMain {
    /**
     * 初始化
     * @param {Object} props - 初始化依赖的属性
     * @param {Object} props.game - 全局 game 对象
     * @constructor
     */
    constructor (props) {
        this.game = props.game;
        this.door = null;
        this.blobs = [];
        this.treasure = null;
        this.explorer = null;
    }

    /**
     * 更新探险者状态
     * @private
     */
    _updateExplorerState () {
        const keyboard = this.game.input.keyboard;
        const leftPress = keyboard.isDown(Phaser.Keyboard.LEFT) ? 1 : 0;
        const rightPress = keyboard.isDown(Phaser.Keyboard.RIGHT) ? 1 : 0;
        const upPress = keyboard.isDown(Phaser.Keyboard.UP) ? 1 : 0;
        const downPress = keyboard.isDown(Phaser.Keyboard.DOWN) ? 1 : 0;

        this.explorer.x += 5 * (rightPress - leftPress);
        this.explorer.y += 5 * (downPress - upPress);
    }

    /**
     * 资源加载
     */
    preload () {
        this.game.load.atlas(
            'train',
            '/dist/images/treasureHunter.png',
            '/dist/images/treasureHunter.json'
        );
        // TODO 添加资源载入进度效果
    }

    /**
     * 创建游戏中涉及的对象并进行初始设定
     */
    create () {
        // 地牢
        const dungeon = this.game.add.sprite(0, 0, 'train', 'dungeon.png');

        // 门
        this.door = this.game.add.sprite(32, 0, 'train', 'door.png');

        // 史莱姆
        const spacing = 48;
        const xOffset = 150;
        this.blobs = [];
        for (let i = 0; i < 6; i++) {
            let blob = this.game.add.sprite(0, 0, 'train', 'blob.png');
            blob.x = spacing * i + xOffset;
            blob.y = randomInt(32, this.game.height - blob.height - 32);
            this.blobs.push(blob);
        }

        // 宝箱
        this.treasure = this.game.add.sprite(0, 0, 'train', 'treasure.png');
        this.treasure.x = this.game.width - this.treasure.width - 48;
        this.treasure.y = this.game.height / 2 - this.treasure.height / 2;

        // 探险者
        this.explorer = this.game.add.sprite(0, 0, 'train', 'explorer.png');
        this.explorer.x = 68;
        this.explorer.y = this.game.height / 2 - this.explorer.height / 2;

        // 血条
        
    }

    /**
     * 周期性执行的 update 操作
     */
    update () {
        this._updateExplorerState();
    }

    /**
     * 更新后的操作
     */
    render () {
        // do nothing
    }
}

export default GameMain;