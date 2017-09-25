/**
 * phaser base3 的案例
 *
 * @author wujohns
 * @date 17/9/20
 */
'use strict';

import GameLoad from './game_load';
import GameMain from './game_main';
import GameOver from './game_over';

const game = new Phaser.Game(
    512, 512,
    Phaser.CANVAS, 'phaser'
);

const gameLoad = new GameLoad({ game: game });
const gameMain = new GameMain({ game: game });
const gameWin = new GameOver({ game: game, title: 'you win!' });
const gameLose = new GameOver({ game: game, title: 'you lose!' });

game.state.add('gameLoad', gameLoad);
game.state.add('gameMain', gameMain);
game.state.add('gameWin', gameWin);
game.state.add('gameLose', gameLose);

game.state.start('gameLoad');