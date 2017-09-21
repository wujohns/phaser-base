/**
 * phaser base3 的案例
 *
 * @author wujohns
 * @date 17/9/20
 */
'use strict';

import GameMain from './game_main';
import GameOver from './game_over';

const game = new Phaser.Game(
    512, 512,
    Phaser.CANVAS, 'phaser'
);

const gameMain = new GameMain({ game: game });
const gameOver = new GameOver(game);

game.state.add('gameMain', gameMain);
game.state.add('gameOver', gameOver);

game.state.start('gameMain');