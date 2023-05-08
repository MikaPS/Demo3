class First extends Phaser.Scene {
    constructor() {
        super('first');
        this.duration = 0;
        this.rock;
    }

   

    preload() {
        this.load.image('boat', '../assets/boat/woodboat.png');
        // this.load.image('table', '../assets/table.png');
        this.load.image('background', './assets/bg.jpeg');
        
    }

    create() {
        // // variables and settings
        this.ACCELERATION = 500;
        this.DRAG = 100;    // DRAG < ACCELERATION = icy slide
        this.duration;

        // background and player sprites
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setScale(2);

        this.rock = this.physics.add.sprite(0,0,'boat').setScale(0.2);


        this.player = this.physics.add.sprite(200,100, 'boat').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.background);
        this.physics.add.collider(this.player, this.rock);

        // mouse interaction
        var startTime; // declare a variable to store the start time of the click
        this.input.on('pointerdown', function (pointer) {
            startTime = this.time.now; // store the start time when the mouse is clicked
        }, this);
    
        this.input.on('pointerup', function (pointer) {
            this.duration = this.time.now - startTime; // calculate the duration by subtracting the start time from the current time
            // console.log(duration); // print the duration to the console
            waterDamage += parseInt(this.duration/500);
        }, this);

        // update water damage
        var timeEvent = this.time.addEvent({
            delay: 3000, // The delay between updates, in milliseconds
            callback: this.updateWater, // The function to call on each update
            callbackScope: this,
            loop: true // Set to true to repeat the event indefinitely
          });
        this.text = this.add.text(this.sys.game.config.width*0.85, this.sys.game.config.height*0.05, "Dmg: " + waterDamage + "%")
            .setFontSize(45);
         

    }

    update() {    
        this.text.setText("Dmg: " + waterDamage + "%")
        // console.log(waterDamage);
        // background movement        
        if (this.duration > 0) {
            this.background.tilePositionX += this.duration/100;
            this.duration -= 10;
        }
        this.background.tilePositionX += 2;
        if (this.background.tilePositionX < -this.background.width) {
          this.background.tilePositionX += this.background.width;
        }

        if (this.rock.alpha == 1) {
            this.rock.x -= 10;
        }

        if (this.rock.x < -this.background.width) {
            // this.rock.setAlpha(0);
            this.addRock();
        }
        // LOSING CONDITIONS
        this.physics.add.collider(this.player, this.rock, () => {
            this.scene.start('losingscreen');
        });
        if (waterDamage >= 100) {
            this.scene.start('losingscreen');
        }
        // check keyboard input
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

    updateWater() {
        waterDamage += 3;
    }

    addRock() {
        // Get a random x and y coordinate within the game width and height
        const x = Math.floor(Math.random() * this.sys.game.config.width + this.sys.game.config.width*0.7);
        const y = Math.floor(Math.random() * this.sys.game.config.height);
        this.rock.setAlpha(1);
        
        // Create a square sprite with a white fill and black stroke
        
        // Set the position of the square to the random x and y coordinates
        this.rock.x = x;
        this.rock.y = y;
    }
    
}