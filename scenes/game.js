class First extends Phaser.Scene {
    constructor() {
        super('first');
        this.duration = 0;
        this.rock;
        this.canPress = true;
    }

   

    preload() {
        this.load.image('boat', '../assets/boat/woodboat.png');
        // this.load.image('table', '../assets/table.png');
        this.load.image('background', './assets/bg.jpeg');
        this.load.image('woodboat', '../assets/boat/woodboat.png');
        this.load.image('woodside', '../assets/boat/woodside.png');        
        this.load.image('plasticboat', '../assets/boat/woodboat.png');
        this.load.image('plasticside', '../assets/boat/woodside.png');        
    }

    create() {
        if (level == 1) {
            distance = 0;
            targetDist = 100;
            this.waterDelay = 3000;
            this.rockNum = 1;
            this.rockSpeed = 12;
            waterDamage = 0;
        }
        else if (level == 2) {
            distance = 0;
            targetDist = 300;
            this.waterDelay = 2500;
            this.rockNum = 3;
            this.rockSpeed = 15;
            this.hasBucket = true;
            waterDamage = 0;
        } else {
            distance = 0;
            targetDist = 500;
            this.waterDelay = 3500;
            this.rockNum = 5;
            this.rockSpeed = 15;
            waterDamage = 0;
        }
        // variables and settings
        this.ACCELERATION = 500;
        this.DRAG = 100;    // DRAG < ACCELERATION = icy slide
        this.duration;

        // background and player sprites
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setScale(2);

        // Get player image
        this.player = this.physics.add.sprite(200,100, 'boat').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.background);
        // this.physics.add.collider(this.player, this.rock);

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
        this.time.addEvent({
            delay: this.waterDelay, // The delay between updates, in milliseconds
            callback: this.updateWater, // The function to call on each update
            callbackScope: this,
            loop: true // Set to true to repeat the event indefinitely
          });
        this.text = this.add.text(this.sys.game.config.width*0.82, this.sys.game.config.height*0.05, "Dmg: " + waterDamage + "%")
            .setFontSize(45);
         
        // update distance
        this.time.addEvent({
            delay: 2000, // The delay between updates, in milliseconds
            callback: this.updateDist, // The function to call on each update
            callbackScope: this,
            loop: true // Set to true to repeat the event indefinitely
        });
        this.distTxt = this.add.text(this.sys.game.config.width*0.82, this.sys.game.config.height*0.1, "Dist: " + parseInt(distance) + "/" + targetDist)
            .setFontSize(45);
        this.lvlTxt = this.add.text(this.sys.game.config.width*0.82, this.sys.game.config.height*0.15, "Level: " + level)
            .setFontSize(45);
        // handle rocks
        this.rock = this.physics.add.sprite(-10,0,'boat').setScale(0.2);
        this.rock2 = this.physics.add.sprite(-10,0,'boat').setScale(0.2);
        this.rock3 = this.physics.add.sprite(-10,0,'boat').setScale(0.2);
        this.rock4 = this.physics.add.sprite(-10,0,'boat').setScale(0.2);
        this.rock5 = this.physics.add.sprite(-10,0,'boat').setScale(0.2);
    }

    update() {    
        // WINNING CONDITIONS
        if (distance >= targetDist) {
            this.scene.start('winningscreen');
        }
        this.text.setText("Dmg: " + waterDamage + "%");
        this.distTxt.setText("Dist: " + parseInt(distance) + "/" + targetDist);
        // background movement        
        if (this.duration > 0) {
            this.background.tilePositionX += this.duration/100;
            distance += 0.05;
            this.duration -= 10; 
        }
        this.background.tilePositionX += 2;
        if (this.background.tilePositionX < -this.background.width) {
          this.background.tilePositionX += this.background.width;
        }

        
        // two rocks
        if (level == 1) {
            this.rockBehavior(this.rock);
            this.rockBehavior(this.rock2);
        }
        // three rocks
        if (level == 2) {
            this.rockBehavior(this.rock);
            this.rockBehavior(this.rock2);
            this.rockBehavior(this.rock3);
        }
        // five rocks
        if (level == 3) {
            this.rockBehavior(this.rock);
            this.rockBehavior(this.rock2);
            this.rockBehavior(this.rock3);
            this.rockBehavior(this.rock4);
            this.rockBehavior(this.rock5);
        }
        // LOSING CONDITIONS
        this.physics.add.collider(this.player, this.rock, () => {
            this.scene.start('losingscreen');
        });
        this.physics.add.collider(this.player, this.rock2, () => {
            this.scene.start('losingscreen');
        });
        this.physics.add.collider(this.player, this.rock3, () => {
            this.scene.start('losingscreen');
        });
        this.physics.add.collider(this.player, this.rock4, () => {
            this.scene.start('losingscreen');
        });
        this.physics.add.collider(this.player, this.rock5, () => {
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

        
        // console.log(this.canPress);
        if (this.canPress == true) {
            if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE), 500)) {
                console.log(this.canPress);
                waterDamage -= 2;
                this.time.addEvent({
                    delay: 2000, // The delay between updates, in milliseconds
                    callback: this.powerup, // The function to call on each update
                    callbackScope: this,
                });
            } 
        }

    }

    updateWater() {
        waterDamage += 5;
    }

    updateDist() {
        distance += 5;
    }

    rockBehavior(item) {
        item.x -= this.rockSpeed;
        if (item.x < -this.background.width) {
            this.addRock(item);
        }
    }
    addRock(item) {
        // Get a random x and y coordinate within the game width and height
        const x = Math.floor(Math.random() * this.sys.game.config.width + this.sys.game.config.width*0.7);
        const y = Math.floor(Math.random() * this.sys.game.config.height);
        // Set the position of the square to the random x and y coordinates
        item.x = x;
        item.y = y;
    }

    powerup() {
        this.canPress = true;
    }
    
}