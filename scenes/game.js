class First extends Phaser.Scene {
    constructor() {
        super('first');
        this.duration = 0;
        this.rock;
        this.canPress = true;
        this.state = true;
    }
   
    preload() {
        this.load.image('boat', './assets/boat/woodboat.png');
        this.load.image('background', './assets/bg.jpeg');
        this.load.image('woodboat', './assets/boat/woodboat.png');
        this.load.image('woodside', './assets/boat/woodside.png');        
        this.load.image('goal', './assets/finishline.jpeg');        
        this.load.image('rock', './assets/rock.png');        
        this.load.image('gift', './assets/gift.png');        
    }

    create() {
        this.cameras.main.fadeIn(500);
        this.waterDamage = 0;
        distance = 0;
        // Different settings for each level
        if (level == 1) {
            targetDist = 50;
            this.waterDelay = 3000;
            this.rockSpeed = 12;
        }
        else if (level == 2) {
            targetDist = 300;
            this.waterDelay = 2700;
            this.rockSpeed = 15;
            this.canPick = true;
            
        } else {
            targetDist = 400;
            this.waterDelay = 3500;
            this.rockSpeed = 12;
            this.canPick = true;
            this.collect = 0;
            this.maxCollect = 5;
            this.collidedWCollect = false;
        }

        this.ACCELERATION = 500;
        this.DRAG = 100;    

        // Background sprite
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'background');
        this.background.setScale(2);

        // Get player image
        this.player = this.physics.add.sprite(200,100, 'boat').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.background);
        // Finish line
        this.goal = this.physics.add.sprite(this.sys.game.config.width*0.7,this.sys.game.config.height*0.5,'goal').setScale(1,2).setAlpha(0);

        // mouse interaction
        startTime = this.time.now; // declare a variable to store the start time of the click
        this.input.on('pointerdown', function (pointer) {
            startTime = this.time.now; // store the start time when the mouse is clicked
        }, this);
        
        this.input.on('pointerup', function (pointer) {
            if (this.state) {
                this.duration = this.time.now - startTime; // calculate the duration by subtracting the start time from the current time
                this.waterDamage += parseInt(this.duration/500);
            }
        }, this);

        // update water damage
        if (distance < targetDist) {
            this.time.addEvent({
                delay: this.waterDelay, 
                callback: this.updateWater, 
                callbackScope: this,
                loop: true 
            });
        }
        // update distance
        this.time.addEvent({
            delay: 2000, 
            callback: this.updateDist, 
            callbackScope: this,
            loop: true
        });

        // handle rocks
        this.rock = this.physics.add.sprite(-10,0,'rock').setScale(0.6).setAlpha(0);
        this.rock2 = this.physics.add.sprite(-10,0,'rock').setScale(0.6).setAlpha(0);
        this.rock3 = this.physics.add.sprite(-10,0,'rock').setScale(0.6).setAlpha(0);
        this.rock4 = this.physics.add.sprite(-10,0,'rock').setScale(0.6).setAlpha(0);
        this.rock5 = this.physics.add.sprite(-10,0,'rock').setScale(0.6).setAlpha(0);

        // Special abilities for different levels
        if (level == 2) {
        this.lessDmg = this.physics.add.sprite(-10,0,'woodside')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.waterDamage -= 6;
                this.lessDmg.x = -this.background.width;
            });
        }
        if (level == 3) {
            this.lessDmg = this.physics.add.sprite(-10,0,'woodside')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.waterDamage -= 6;
                this.lessDmg.x = -this.background.width;
            });
            this.gift = this.physics.add.sprite(-10,0,'gift').setScale(0.7);
            this.collectTxt = this.add.text(this.sys.game.config.width*0.8, this.sys.game.config.height*0.2, "Collect: " + this.collect + "/" + this.maxCollect).setFontSize(45).setDepth(2);     
        }
        
        // Top right texts
        this.text = this.add.text(this.sys.game.config.width*0.8, this.sys.game.config.height*0.05, "Dmg: " + this.waterDamage + "%")
            .setFontSize(45).setDepth(2);
        this.distTxt = this.add.text(this.sys.game.config.width*0.8, this.sys.game.config.height*0.1, "Dist: " + parseInt(distance) + "/" + targetDist)
            .setFontSize(45).setDepth(2);
        this.lvlTxt = this.add.text(this.sys.game.config.width*0.8, this.sys.game.config.height*0.15, "Level: " + level)
            .setFontSize(45).setDepth(2);

        // Show when to click number 1
        this.one = this.add.rectangle(this.sys.game.config.width*0.97,this.sys.game.config.height*0.05, this.sys.game.config.height*0.05, this.sys.game.config.height*0.05, 0xb0b7c2);
        this.oneTxt = this.add.text(this.sys.game.config.width*0.964,this.sys.game.config.height*0.035, "1", { fill: '#000000' }).setFontSize(40);
        
    } 

    update() {    
        // Show goal when you are close to the target distance
        if (distance+5 >= targetDist) {
            this.goal.setAlpha(0.8);
        }
        // Move goal towards player
        if (this.goal.alpha > 0) {
            this.goal.x -= 8;
            this.physics.add.collider(this.player, this.goal, () => {
                this.goal.x = -this.sys.game.config.width;
                this.state = false;
                this.transition('winningscreen');
            });
        }

        // Update text
        this.text.setText("Dmg: " + this.waterDamage + "%");
        this.distTxt.setText("Dist: " + parseInt(distance) + "/" + targetDist);
        
        // Looping background movement        
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
            this.dmgBehavior(this.lessDmg);
        }
        // five rocks
        if (level == 3) {
            this.rockBehavior(this.rock);
            this.rockBehavior(this.rock2);
            this.rockBehavior(this.rock3);
            this.rockBehavior(this.rock4);
            this.rockBehavior(this.rock5);
            // Special items
            this.dmgBehavior(this.gift);
            this.dmgBehavior(this.lessDmg);
            this.collectTxt.setText("Collect: " + this.collect + "/" + this.maxCollect);

            this.physics.add.collider(this.player, this.gift, () => {
                this.gift.x = -this.background.width;
                this.collidedWCollect = true;
            });
            if (this.collidedWCollect == true) {
                this.collect += 1;
                this.collidedWCollect = false;
            }
        }
        // LOSING CONDITIONS
        this.losing(this.rock);
        this.losing(this.rock2);
        this.losing(this.rock3);
        this.losing(this.rock4);
        this.losing(this.rock5);
        if (this.waterDamage >= 100) {
            this.state = false;
            this.scene.start('losingscreen');
        }

        // check keyboard input
        if(cursors.up.isDown) {
            this.player.body.setAccelerationY(-this.ACCELERATION);
        } else if(cursors.down.isDown) {
            this.player.body.setAccelerationY(this.ACCELERATION);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.player.body.setAccelerationY(0);
            this.player.body.setDragY(this.DRAG);
        }
        
        // Shows if you can press the number 1
        if (this.canPress) {
            this.one.setStrokeStyle(5, 0x45fffc);
        } else {
            this.one.setStrokeStyle(2, 0xb0b7c2);
        }
        // Interaction that happens when pressing 1
        if (this.canPress == true) {
           
            if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE), 500)) {
                this.waterDamage -= 2;
                this.canPress = false;
                this.time.addEvent({
                    delay: 2000, 
                    callback: this.powerup, 
                    callbackScope: this,
                });
            } 
        }

    }

    updateWater() {
        this.waterDamage += 5;
        // Make the boat more transparent as the water damage increases
        this.player.alpha = 1-(this.waterDamage/(4*100));
    }

    updateDist() {
        this.state = true;
        distance += 5;
    }

    rockBehavior(item) {
        item.setAlpha(1);
        item.x -= this.rockSpeed;
        if (item.x < -this.background.width) {
            this.addRock(item);
        }
    }

    addRock(item) {
        // Get a random x and y coordinate within the game width and height
        const x = Math.floor(Math.random() * this.sys.game.config.width + this.sys.game.config.width*0.7);
        const y = Math.floor(Math.random() * this.sys.game.config.height);
        item.x = x;
        item.y = y;
    }

    dmgBehavior(item) {
        item.x -= 6;
        if (item.x < -2*this.background.width) {
            item.body.velocity.y = 0;
            const x = Math.floor(Math.random() * this.sys.game.config.width + this.sys.game.config.width*0.7);
            const y = Math.floor(Math.random() * this.sys.game.config.height);
            item.x = x;
            item.y = y;
        }
    }
   
    powerup() {
        this.canPress = true;
    }
    
    transition(scene) {
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              this.scene.start(scene);
            }
          });
    }

    losing(item) {
        this.physics.add.collider(this.player, item, () => {
            this.state = false;
            this.scene.start('losingscreen');
        });
    }
}