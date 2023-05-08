class First extends Phaser.Scene {
    constructor() {
        super('first');
    }

    preload() {
        // this.load.image('ghost', '../assets/ghost.png');
        // this.load.image('table', '../assets/table.png');
        this.load.image('background', './assets/bg.jpeg');
        
    }

    create() {
        // // variables and settings
        // this.ACCELERATION = 500;
        // this.DRAG = 200;    // DRAG < ACCELERATION = icy slide
        // this.physics.world.gravity.y = 1000;

        // // make ground tiles
        // this.ground = this.add.group();
        // // for(let i = 0; i < game.config.width; i += tileSize) {
        // let groundTile = this.physics.add.sprite(200, 400, 'table');
        // groundTile.body.immovable = true;
        // groundTile.body.allowGravity = false;
        // this.ground.add(groundTile);
        // // }
        // this.player = this.physics.add.sprite(200,100, 'ghost').setScale(0.5);
        // this.player.setCollideWorldBounds(true);
        // cursors = this.input.keyboard.createCursorKeys();
        // this.physics.add.collider(this.player, this.ground);
        
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setScale(2);

    }

    update() {
        this.background.tilePositionX += 3;
        if (this.background.tilePositionX < -this.background.width) {
          this.background.tilePositionX += this.background.width;
        }

        // // check keyboard input
        // if(cursors.left.isDown) {
        //     this.player.body.setAccelerationX(-this.ACCELERATION);
        //     this.player.setFlip(true, false);
        //     // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
        //     // play(key [, ignoreIfPlaying] [, startFrame])
        // } else if(cursors.right.isDown) {
        //     this.player.body.setAccelerationX(this.ACCELERATION);
        //     this.player.resetFlip();
        // } else {
        //     // set acceleration to 0 so DRAG will take over
        //     this.player.body.setAccelerationX(0);
        //     this.player.body.setDragX(this.DRAG);
        // }
    }
}