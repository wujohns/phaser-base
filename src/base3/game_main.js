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

        this.explorer.body.velocity.x = 300 * (rightPress - leftPress);
        this.explorer.body.velocity.y = 300 * (downPress - upPress);
    }

    /**
     * 血条状态更新
     */
    _updateHealthBarState () {
        // 检查 blobs 与 explorer 的碰撞
        const isOverlap = this.physics.arcade.overlap(
            this.explorer, this.blobs,
            (explorer, blob) => {
                // 当 exploer 与 blob 碰撞时
                explorer.alpha = 0.5;
                this.outerBar.width -= 1;
                // blob.kill();  删除 blob（想干掉blob吗）
            }
        );
        if (!isOverlap) {
            this.explorer.alpha = 1;
        }

        if (this.outerBar.width <= 0) {
            // 进入游戏失败场景
            this.game.state.start('gameLose');
        }
    }

    /**
     * 宝箱状态更新
     * @private
     */
    _updateTreasureState () {
        // 检查 treasure 与 explorer 的碰撞
        this.physics.arcade.overlap(
            this.explorer, this.treasure,
            (explorer, treasure) => {
                treasure.x = explorer.x + 8;
                treasure.y = explorer.y + 8;
            }
        );

        // 游戏胜利条件判定
        this.physics.arcade.overlap(
            this.door, this.treasure,
            () => {
                // 进入游戏胜利场景
                this.game.state.start('gameWin');
            }
        );
    }

    /**
     * 资源加载
     */
    preload () {
        // 已在 gameLoad 中加载
    }

    /**
     * 创建游戏中涉及的对象并进行初始设定
     */
    create () {
        // 物理引擎开启与设定（这里不开启重力）
        this.physics = this.game.physics;
        this.physics.startSystem(Phaser.Physics.Arcade);
        this.physics.arcade.setBounds(28, 10, 480, 480);    // 设置碰撞边界

        // 地牢
        const dungeon = this.game.add.sprite(0, 0, 'train', 'dungeon.png');

        // 门
        this.door = this.game.add.sprite(32, 0, 'train', 'door.png');
        this.physics.enable(this.door);
        this.door.body.allowGravity = false;

        // 史莱姆
        const spacing = 48;
        const xOffset = 150;
        this.blobs = this.game.add.group();
        for (let i = 0; i < 6; i++) {
            // 创建 blob 对象
            let blob = this.game.add.sprite(0, 0, 'train', 'blob.png');
            blob.x = spacing * i + xOffset;
            blob.y = randomInt(32, this.game.height - blob.height - 32);

            this.physics.enable(blob);   // 开启物理引擎支持
            blob.body.allowGravity = false; // 清除重力影响
            blob.body.velocity.setTo(0, 200);   // 速度设定
            blob.body.bounce.setTo(0, 1);       // 遭遇碰撞后反弹的速度比例
            blob.body.collideWorldBounds = true;

            // 将 blob 添加至 blobs
            this.blobs.add(blob);
        }

        // 宝箱
        this.treasure = this.game.add.sprite(0, 0, 'train', 'treasure.png');
        this.treasure.x = this.game.width - this.treasure.width - 48;
        this.treasure.y = this.game.height / 2 - this.treasure.height / 2;
        this.treasure.inputEnabled = true;
        this.treasure.input.enableDrag();
        this.physics.enable(this.treasure);

        // 探险者
        this.explorer = this.game.add.sprite(0, 0, 'train', 'explorer.png');
        this.explorer.x = 68;
        this.explorer.y = this.game.height / 2 - this.explorer.height / 2;
        this.physics.enable(this.explorer);
        this.explorer.body.allowGravity = false;
        this.explorer.body.collideWorldBounds = true;

        // 血条
        this.healthBar = this.game.add.group();
        this.healthBar.x = this.game.width - 170;
        this.healthBar.y = 6;

        this.innerBar = this.game.add.graphics(0, 0, this.healthBar);
        this.innerBar.beginFill(0x000000);
        this.innerBar.drawRect(0, 0, 128, 8);
        this.innerBar.endFill();

        this.outerBar = this.game.add.graphics(0, 0, this.healthBar);
        this.outerBar.beginFill(0xFF3300);
        this.outerBar.drawRect(0, 0, 128, 8);
        this.outerBar.endFill();
    }

    /**
     * 周期性执行的 update 操作
     */
    update () {
        this._updateExplorerState();
        this._updateHealthBarState();
        this._updateTreasureState();
    }

    /**
     * 更新后的操作
     */
    render () {
        // do nothing
    }
}

export default GameMain;