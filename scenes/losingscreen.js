class LosingScreen extends Phaser.Scene {
    constructor() {
        super('losingscreen');
    }

   

    preload() {
        this.load.image('background', './assets/bg.jpeg');        
    }

    create() {
        this.cameras.main.fadeIn(500);
        // background and player sprites
        this.background =this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2,'background').setScale(4);

        this.add.text(this.sys.game.config.width*0.35, this.sys.game.config.height*0.2, "LOST GAME")
            .setFontSize(80)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold');

        this.add.text(this.sys.game.config.width*0.2, this.sys.game.config.width*0.2, "It was a nice try, but don’t give up yet.\n\nNext time you will succeed.")
            .setFontSize(50);

        this.move = this.add.text(this.sys.game.config.width*0.36, this.sys.game.config.height*0.6, "Click to Restart!")
            .setFontSize(70)
            .setFontFamily('CustomFont')
            .setFontStyle('Bold')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                startTime = this.time.now;
                if (level == 1) { level = 1; }
                else if (level == 2) { level = 2; }
                else { level = 3; }
                this.scene.start('first');
            });
         

    }

    update() {    

    }
}