let cursors;
let waterRate = 10;
const SCALE = 0.5;
const tileSize = 35;
let distance = 0;
let targetDist = 0;
let level = 1;
let startTime;

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
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [TitleScreen, Instructions, First, LosingScreen, WinningScreen]
};

let game = new Phaser.Game(config);