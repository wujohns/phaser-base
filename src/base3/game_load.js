/**
 * 游戏载入部分
 *
 * @author wujohns
 * @date 17/9/25
 */
'use strict';

class GameLoad {
    /**
     * 初始化
     * @param {Object} props - 初始化依赖的属性
     * @param {Object} props.game - 全局 game 对象
     * @constructor
     */
    constructor (props) {
        this.game = props.game;
    }

    /**
     * 资源的加载
     */
    preload () {
        this.game.load.atlas(
            'train',
            '/dist/images/treasureHunter.png',
            '/dist/images/treasureHunter.json'
        );

        const progressText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '0%', {
            fontSize: '60px',
            fill: '#fff'
        });
        progressText.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add((progress) => {
            progressText.text = `${ progress }%`;
        });

        let deadLine = false;
        setTimeout(() => {
            deadLine = true;
        }, 2000);
        const onLoad = () => {
            if (deadLine) {
                this.game.state.start('gameMain');
            } else {
                setTimeout(onLoad, 1000);
            }
        }
        this.game.load.onLoadComplete.add(onLoad);
    }
}

module.exports = GameLoad;