import Button from "../UI_Objects/Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }
    init() {

    }
    preload() {
        this.load.image('mas', 'srcJuego/img/simbolo_mas.png')
    }
    create() {
        var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
        const fondo = this.add.rectangle(0, 0, 1000, 1000, 0x6666ff);
        const titulo = this.add.text(0, -450, 'Me quiero matar', { font: '40px JosefinBold', fill: 'black', aling:'center' }).setOrigin(0.5,0);

        const unpause = new Button(this, -400, -400, 'heart', 0.15, () => {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Menu');
            MainScene.scene.setActive(true);
        })

        centro.add(fondo);
        centro.add(unpause);
        centro.add(titulo);

        var container1 =this.add.container(0, -320);
        container1.add(this.add.rectangle(0, 0, 700, 90, 0xffffff));
        container1.add(new Button(this, -300, 0, 'kirby', 0.15, () => { }));
        container1.add(new Button(this, 300, 0, 'kirby', 0.15, () => { }));
        centro.add(container1);

        var container2 =this.add.container(0, -220);
        container2.add(this.add.rectangle(0, 0, 700, 90, 0xffffff));
        container2.add(new Button(this, -300, 0, 'kirby', 0.15, () => { }));
        container2.add(new Button(this, 300, 0, 'kirby', 0.15, () => { }));
        centro.add(container2);

        var container3 =this.add.container(0, -120);
        container3.add(this.add.rectangle(0, 0, 700, 90, 0xffffff));
        container3.add(new Button(this, -300, 0, 'kirby', 0.15, () => { }));
        container3.add(new Button(this, 300, 0, 'kirby', 0.15, () => { }));
        centro.add(container3);

        var container4 =this.add.container(0, -20);
        container4.add(this.add.rectangle(0, 0, 700, 90, 0xffffff));
        container4.add(new Button(this, -300, 0, 'kirby', 0.15, () => { }));
        container4.add(new Button(this, 300, 0, 'kirby', 0.15, () => { }));
        centro.add(container4);
    }
}
