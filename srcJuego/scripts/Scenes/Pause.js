
import Button from "../UI_Objects/Button.js"


export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key: "Pause"});
    }

    create(){
        
        this.add.image(960, 540, 'pauseBG').setOrigin(0.5, 0.5);

        const resume = new Button(this, 960, 250, 'resume', 1, () => {
            this.scene.sleep('Pause');
            this.scene.wake('UIScene');
            this.scene.wake('level');
            this.scene.get('level').music.resume();
        })

        const restart = new Button(this, 580, 540, 'restart', 1, () => {
            this.scene.sleep('Pause');
            this.scene.wake('UIScene');
            this.scene.wake('level');
            this.scene.sleep('UIScene');
            this.scene.sleep('level');
            this.scene.launch('level');
        })

        const quit = new Button(this, 1300, 540, 'quit', 1, () => {  
            this.scene.sleep('Pause');
            this.scene.wake('UIScene');
            this.scene.wake('level');
            this.scene.sleep('UIScene')
            this.scene.sleep('level')
            this.scene.run('StartMenu');
        })

        const fullScreenButton = this.add.image(960, 840, 'fullscreenMenu', 0).setOrigin(0.5, 0.5).setInteractive();
        if (this.scale.isFullscreen) { fullScreenButton.setFrame(1); }
        else { fullScreenButton.setFrame(0); }

        fullScreenButton.on('pointerup', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();

                document.getElementById("seccion-juego").className = "classSeccionJuego";
                document.getElementById("juego").className = "classJuego";

                fullScreenButton.setFrame(0);
            }

            else {
                this.scale.startFullscreen();

                document.getElementById("seccion-juego").className = "";
                document.getElementById("juego").className = "";

                fullScreenButton.setFrame(1);
            }
        }, this);


        this.pause = this.input.keyboard.addKey('P');
        this.esc = this.input.keyboard.addKey('ESC');

        this.pause.on('down', event => {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Pause');
            MainScene.scene.setActive(true);
            MainScene.music.resume();

        });



        this.esc.on('up', event => {
            this.scale.stopFullscreen();
            document.getElementById("seccion-juego").className = "classSeccionJuego";
            document.getElementById("juego").className = "classJuego";
        })


        console.log("tu vieja");
    }
}