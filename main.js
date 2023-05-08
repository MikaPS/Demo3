let cursors;
let currentScene = 0;
let waterDamage = 0;
let waterRate = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    }, 
    type: Phaser.WEBGL,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    // scene: [First, losingScreen]
    scene: [BuildScene]
};

let game = new Phaser.Game(config);