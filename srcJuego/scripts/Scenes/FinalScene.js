export default class FinalScene extends Phaser.Scene {

    constructor() {
        super({ key: "FinalScene" });

    }

    init(){

    }

    preload(){

    }

    create(){
        this.end = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'GAME OVER', { font: '64px Arial', fill: '#FFFFFF' });

        const restart = new Button(this, this.cameras.main.centerX, this.cameras.main.centerY, 'startButton', 1, () => {
            this.scene.run('boot');
            this.scene.sleep('StartMenu');
        })
    }

    update(){
        
    }

}