class WinningScreen extends Phaser.Scene {
    constructor() {
        super('winningscreen');
    }

    preload() {
        this.load.image('background', './assets/bg.jpeg');    
        this.load.image('gift', './assets/gift.png');  
        this.load.image('woodside', './assets/boat/woodside.png');       
    }

    create() {
        this.cameras.main.fadeIn(500);
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width*0.32, this.sys.game.config.height*0.2, "CLEARED LEVEL")
            .setFontSize(80)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold');
        
        if (level == 1) {
            this.add.text(this.sys.game.config.width*0.05, this.sys.game.config.width*0.2, "We have some good news and bad news…\n\nThe water damage will increase way quicker in the future.\n\nBut, we will give you additional wood pieces in the water to\ncollect and repair any damage of the ship.\nLeft click to collect them.")
            .setFontSize(50);
            this.move = this.add.text(this.sys.game.config.width*0.27, this.sys.game.config.width*0.4, "Click to move to the next adventure!")
            .setFontSize(60)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                startTime = this.time.now;
                level = 2;
                this.scene.start('first');
            });
            this.wood = this.add.image(this.sys.game.config.width*0.1, this.sys.game.config.width*0.1, "woodside");
            const strokeGraphics = this.add.graphics();
            strokeGraphics.lineStyle(5, 0x45fffc); // Set the stroke color and thickness
            strokeGraphics.strokeRect(this.sys.game.config.width*0.03, this.sys.game.config.width*0.078, this.wood.width + 10, this.wood.height + 10); // Position and size the stroke graphics
            this.add.text(this.sys.game.config.width*0.01, this.sys.game.config.width*0.03, "Left click to collect\n(next level) ->")
            .setFontSize(40);    
        }
        else if (level == 2) {
            this.add.text(this.sys.game.config.width*0.05, this.sys.game.config.width*0.2, "You have one last mission, some items fell from the boat\n that came before you.\n\nMake sure to collect at least 5 of the items.\nYou can collect them by touching them with your boat")
            .setFontSize(50);
            this.move = this.add.text(this.sys.game.config.width*0.27, this.sys.game.config.width*0.4, "Click to move to the next adventure!")
            .setFontSize(60)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                startTime = this.time.now;
                level = 3;
                this.scene.start('first');
            });
            this.gift = this.add.image(this.sys.game.config.width*0.1, this.sys.game.config.width*0.1, "gift");
            const strokeGraphics = this.add.graphics();
            strokeGraphics.lineStyle(5, 0x45fffc); // Set the stroke color and thickness
            strokeGraphics.strokeRect(this.sys.game.config.width*0.05, this.sys.game.config.width*0.067, this.gift.width + 10, this.gift.height + 10); // Position and size the stroke graphics
            this.add.text(this.sys.game.config.width*0.01, this.sys.game.config.width*0.04, "Collide with the item to collect it ->")
            .setFontSize(40);    
        }
        else if (level == 3) {
            this.add.text(this.sys.game.config.width*0.04, this.sys.game.config.width*0.2, "Nice job!\n\nYou are now the captain of the seas.\n\nPlay the game again and decide what's your favorite strategy.")
            .setFontSize(50);
            this.move = this.add.text(this.sys.game.config.width*0.38, this.sys.game.config.width*0.4, "Click to Restart!")
            .setFontSize(60)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                level = 1;
                this.scene.start('titlescreen');
            });
        }
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
        this.cameras.main.fadeIn(500);
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
        this.inst = this.add.text(this.sys.game.config.width*0.15, this.sys.game.config.height*0.75, "Instructions", { fill: '#0d3b66' })
            .setFontSize(75)
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
            .setFontSize(75)
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
        this.load.image('highlight', './assets/highlightone.png');      
    }

    create() {
        this.cameras.main.fadeIn(500);
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width*0.02, this.sys.game.config.height*0.02, "Dear,\nYou control a boat and will need to reach a certain distance\n to move to the next level.\n\nYou will die when:\n\t- Touching one of the rocks in the water\n\t- The water damage reaches 100% (it will increase over time)\n\nYou can:\n\t- Move up and down using the arrow keys\n\t- Left click the mouse to quickly cover distance,\n\t\t\t\tbut it will increase the water damage more quickly\n\t- Tapping the number '1' on your keyboard will decrease the\n\t\t\tdamage, but you can only click it once every few seconds\n\t\t\t(will be highlighted in blue when clickable in top right corner of game)")
            .setFontSize(50)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')

        this.add.rectangle(this.sys.game.config.width*0.905, this.sys.game.config.height*0.07, this.sys.game.config.width*0.15, this.sys.game.config.height*0.08, 0xffffff)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('first');
            });  
        this.inst = this.add.text(this.sys.game.config.width*0.85, this.sys.game.config.height*0.025, "Back", { fill: '#0d3b66' })
            .setFontSize(70)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('titlescreen');
            });

        this.add.image(this.sys.game.config.width*0.95, this.sys.game.config.height*0.87, "highlight");
    }
}

