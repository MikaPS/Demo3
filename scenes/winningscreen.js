class WinningScreen extends Phaser.Scene {
    constructor() {
        super('winningscreen');
    }

   

    preload() {
        this.load.image('background', './assets/bg.jpeg');        
    }

    create() {
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width/2.5, this.sys.game.config.height/4, "CLEARED LEVEL")
            .setFontSize(60);
        
        if (level == 1) {
            this.move = this.add.text(this.sys.game.config.width*0.35, this.sys.game.config.width/4, "Click to start next level!")
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                startTime = this.time.now;
                level = 2;
                this.scene.start('first');
            });
        }
        else if (level == 2) {
            this.move = this.add.text(this.sys.game.config.width*0.35, this.sys.game.config.width/4, "Click to start next level!")
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                startTime = this.time.now;
                level = 3;
                this.scene.start('first');
            });   
        }
         
        

    }

    update() {    

    }
}

class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }

    preload() {
        this.load.image('background', './assets/bg.jpeg');        
    }

    create() {
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width/2.6, this.sys.game.config.height/7, "best,\ncalypso\n& boat.")
            .setFontSize(150)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')

        this.add.rectangle(this.sys.game.config.width*0.251, this.sys.game.config.height*0.785, this.sys.game.config.width*0.22, this.sys.game.config.height*0.1, 0xffffff)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('instructions');
            });  
        this.inst = this.add.text(this.sys.game.config.width*0.144, this.sys.game.config.height*0.75, "Instructions", { fill: '#0d3b66' })
            .setFontSize(80)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('instructions');
            });   

        this.add.rectangle(this.sys.game.config.width*0.751, this.sys.game.config.height*0.785, this.sys.game.config.width*0.22, this.sys.game.config.height*0.1, 0xffffff)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('first');
            });  
        this.inst = this.add.text(this.sys.game.config.width*0.7, this.sys.game.config.height*0.75, "Start", { fill: '#0d3b66' })
            .setFontSize(80)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('first');
            });   
    }
}

class Instructions extends Phaser.Scene {
    constructor() {
        super('instructions');
    }

    preload() {
        this.load.image('background', './assets/bg.jpeg');        
    }

    create() {
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width*0.02, this.sys.game.config.height*0.05, "Dear,\nYou control a boat and will need to reach a certain distance\n to move to the next level.\n\nYou will die when:\n\t- Touching one of the rocks in the water\n\t- The water damage reaches 100% (it will increase over time)\n\nYou can:\n\t- Move up and down using the arrow keys\n\t- Right click the mouse to quickly cover distance,\n\t\t\t\tbut it will increase the water damage more quickly\n\t- Click the number '1' on your keyboard will decrease the damage, \n\t\t\t you can only click it once every few seconds\n\nYou will unlock more powers with every level! Good luck have fun!")
            .setFontSize(60)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')

        this.add.rectangle(this.sys.game.config.width*0.905, this.sys.game.config.height*0.07, this.sys.game.config.width*0.15, this.sys.game.config.height*0.08, 0xffffff)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('first');
            });  
        this.inst = this.add.text(this.sys.game.config.width*0.86, this.sys.game.config.height*0.035, "Back", { fill: '#0d3b66' })
            .setFontSize(80)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('titlescreen');
            });   

    }
}

