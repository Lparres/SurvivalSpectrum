import Button from "../UI_Objects/Button.js";

export default class StartMenu extends Phaser.Scene {

    constructor() {
        super({ key: "StartMenu" });

    }

    init() {

    }

    preload() {
       
    }

    create() {
        this.title = this.add.text(this.cameras.main.centerX - 300, this.cameras.main.centerY / 3, 'Survival Spectrum', { font: '64px Arial', fill: '#FFFFFF' });

        this.add.image(0,0, 'fondoMainMenu').setOrigin(0, 0);

        const start = new Button(this, this.cameras.main.centerX, this.cameras.main.centerY, 'startMainMenu', 1, () => {
            this.scene.launch('level');
            this.scene.sleep('StartMenu');
        })

        const fullScreenButton = this.add.image(330, 980, 'fullscreen', 0).setOrigin(0.5, 0.5).setInteractive();
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

        this.esc = this.input.keyboard.addKey('ESC');

        //salir de pantalla completa
        this.esc.on('up', event => {
            this.scale.stopFullscreen();
            document.getElementById("seccion-juego").className = "classSeccionJuego";
            document.getElementById("juego").className = "classJuego";
        })

    }
    update() {

    }


}