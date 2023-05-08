class First extends Phaser.Scene {
    constructor() {
        super('first');
        this.duration = 0;
        this.startTime = 0;
    }

    preload() {
        this.load.image('ghost', '../assets/boat/woodboat.png');
        // this.load.image('table', '../assets/table.png');
        this.load.image('background', './assets/bg.jpeg');
        
    }

    create() {
        // // variables and settings
        this.ACCELERATION = 500;
        this.DRAG = 200;    // DRAG < ACCELERATION = icy slide
        this.duration;
        // this.physics.world.gravity.y = 1000;

        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setScale(2);
        // // make ground tiles
        // this.ground = this.add.group();
        // // for(let i = 0; i < game.config.width; i += tileSize) {
        // let groundTile = this.physics.add.sprite(200, 400, 'table');
        // groundTile.body.immovable = true;
        // groundTile.body.allowGravity = false;
        // this.ground.add(groundTile);
        // // }
        this.player = this.physics.add.sprite(200,100, 'ghost').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.background);
        
        this.startTime; // declare a variable to store the start time of the click
        this.input.on('pointerdown', function (pointer) {
            this.startTime = this.time.now; // store the start time when the mouse is clicked
        }, this);
    
        this.input.on('pointerup', function (pointer) {
            this.duration = this.time.now - this.startTime; // calculate the duration by subtracting the start time from the current time
            // console.log(duration); // print the duration to the console
        }, this);
        

    }

    update() {
        console.log(this.startTime);
        while (this.startTime - this.time.now < 500) {
            this.background.tilePositionX += this.duration/100;
        }
        this.background.tilePositionX += 2;
        if (this.background.tilePositionX < -this.background.width) {
          this.background.tilePositionX += this.background.width;
        }

        // // check keyboard input
        if(cursors.up.isDown) {
            this.player.body.setAccelerationY(-this.ACCELERATION);
            // this.player.setFlip(true, false);
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
            // play(key [, ignoreIfPlaying] [, startFrame])
        } else if(cursors.down.isDown) {
            this.player.body.setAccelerationY(this.ACCELERATION);
            // this.player.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.player.body.setAccelerationY(0);
            this.player.body.setDragY(this.DRAG);
        }

        // Move faster based on how long the mouse click is
 

    }
}