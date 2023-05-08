class BuildScene extends Phaser.Scene {
    constructor() {
        super('buildscene');
        this.money = 50;
        this.price = 0;
    }

    init() {
        this.w = this.sys.game.config.width;
        this.h = this.sys.game.config.height;
    }

    preload() {
        this.load.image('woodboat', '../assets/boat/woodboat.png');
        this.load.image('woodside', '../assets/boat/woodside.png');        
    }

    create() {
        this.text = this.add.text(this.w*0.1, this.h*0.05, "Build a Boat!")
            .setFontSize(60);

       
        
        this.moneyTxt = this.add.text(this.w*0.6, this.h*0.05, "Money: " + this.money)
            .setFontSize(40);

        this.priceTxt = this.add.text(this.w*0.1, this.h*0.9, "")
            .setFontSize(40);
        this.abilityTxt = this.add.text(this.w*0.1, this.h*0.95, "")
            .setFontSize(40);
        
        this.woodBoatTxt = this.add.text(this.w*0.1, this.h*0.4, " ");
        this.woodBoatCount = 0;
        this.woodSideTxt = this.add.text(this.w*0.1, this.h*0.6, " ");
        this.woodSideCount = 0;
        this.plasticBoatTxt = this.add.text(this.w*0.3, this.h*0.4, " ");
        this.plasticBoatCount = 0;
        this.plasticSideTxt = this.add.text(this.w*0.3, this.h*0.6, " ");
        this.plasticSideCount = 0;

        this.line = this.add.rectangle(this.w/2, 0, this.w*0.02, this.h*2, 0xaabbcc);
        this.woodBoat = this.add.image(this.w*0.1, this.h*0.3, "woodboat")
            .setScale(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                this.price = 30;
                this.priceTxt.setText("Price: " + this.price);
                this.abilityTxt.setText("Basic wood");
            })
            .on('pointerdown', () => {
                this.woodBoatCount += 1;
                if (this.price <= this.money) {
                    this.money -= this.price;
                    this.moneyTxt.setText("Money: " + this.money);
                    this.woodBoatTxt.setText("x" + this.woodBoatCount);
                }
            });

        this.woodSide = this.add.image(this.w*0.1, this.h*0.5, "woodside")
            .setScale(0.6)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                this.price = 15;
                this.priceTxt.setText("Price: " + this.price);
                this.abilityTxt.setText("Take less water damage");
            })
            .on('pointerdown', () => {
                this.woodSideCount += 1;
                if (this.price <= this.money) {
                    this.money -= this.price;
                    this.moneyTxt.setText("Money: " + this.money);
                    this.woodSideTxt.setText("x" + this.woodSideCount);
                }
            });

        this.plasticBoat = this.add.image(this.w*0.3, this.h*0.3, "woodboat")
            .setScale(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                this.price = 50;
                this.priceTxt.setText("Price: " + this.price);
                this.abilityTxt.setText("More durable!");
            })
            .on('pointerdown', () => {
                this.plasticBoatCount += 1;
                if (this.price <= this.money) {
                    this.money -= this.price;
                    this.moneyTxt.setText("Money: " + this.money);
                    this.plasticBoatTxt.setText("x" + this.plasticBoatCount);
                }
            });

        this.plasticSide = this.add.image(this.w*0.3, this.h*0.5, "woodside")
            .setScale(0.6)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                this.price = 30;
                this.priceTxt.setText("Price: " + this.price);
                this.abilityTxt.setText("Take even less water damage!");
            })
            .on('pointerdown', () => {
                this.plasticSideCount += 1;
                if (this.price <= this.money) {
                    this.money -= this.price;
                    this.moneyTxt.setText("Money: " + this.money);
                    this.plasticSideTxt.setText("x" + this.plasticSideCount);
                }
            });

        this.startTxt = this.add.text(this.w*0.03, this.h*0.1, "Click here after chooosing the materials")
            .setFontSize(35)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                
            });

    }

    update() {    
       
    }

}