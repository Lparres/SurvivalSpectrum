import Button from "../UI_Objects/Button.js";

export default class StartMenu extends Phaser.Scene {
    
    constructor() {
        super({ key: "StartMenu" });

    }

    init(){

    }

    preload(){
        this.load.image('startButton', 'srcJuego/img/start.png')
    }

    create(){
        this.title = this.add.text(this.cameras.main.centerX-300, this.cameras.main.centerY/3, 'SCRIPTED GAMES', { font: '64px Arial', fill: '#FFFFFF' });

        const start = new Button(this, this.cameras.main.centerX, this.cameras.main.centerY, 'startButton', 1, () => {
            this.scene.run('boot');
            this.scene.sleep('StartMenu');
        })
    }

    update(){

    }


}