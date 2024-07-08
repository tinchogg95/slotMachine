import { preload } from './preload.js';
import { create } from './create.js';
import { update } from './update.js';
//configuration settings 
const config = {
    width: 800,
    height: 600,
    parent: "game-container",
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }   
};

var game = new Phaser.Game(config);

export { config, game };
