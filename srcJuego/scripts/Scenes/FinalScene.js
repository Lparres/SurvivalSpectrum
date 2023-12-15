export default class FinalScene extends Phaser.Scene {

    constructor() {
        super({ key: "FinalScene" });

    }

    init(){

    }

    preload(){
        this.load.image('tryAgainButton', 'srcJuego/img/try again.png')
    }

    create(){
        this.end = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY/3, 'GAME OVER', { font: '64px Arial', fill: '#FFFFFF' });

        const restart = new Button(this, this.cameras.main.centerX, this.cameras.main.centerY, 'tryAgainButton', 1, () => {
            this.scene.wake('StartMenu');
            this.scene.sleep('FinalScene');

        })
    }

    update(){
        
    }

}