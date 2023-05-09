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
                level = 2;
                this.scene.start('first');
            });
        }
        else if (level == 2) {
            this.move = this.add.text(this.sys.game.config.width*0.35, this.sys.game.config.width/4, "Click to start next level!")
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                level = 3;
                this.scene.start('first');
            });   
        }
         
        

    }

    update() {    

    }
}