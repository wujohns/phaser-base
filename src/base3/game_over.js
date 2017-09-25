/**
 * 游戏结束部分
 *
 * @author wujohns
 * @date 17/9/20
 */
'use strict';

class GameOver {
    /**
     * 初始化
     * @param {Object} props - 初始化依赖的属性
     * @param {Object} props.game - 全局 game 对象
     * @param {String} props.title - 显示的文字
     * @constructor
     */
    constructor (props) {
        this.game = props.game;
        this.title = props.title;
    }

    /**
     * 组件的创建
     */
    create () {
        const style = {
            fontSize: '64px',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        const text = this.game.add.text(0, 0, this.title, style);
        text.setShadow(3, 3, 'rgba(0 , 0, 0, 0.5)', 2);
        text.setTextBounds(0, 0, this.game.width, this.game.height);
    }
}

export default GameOver;