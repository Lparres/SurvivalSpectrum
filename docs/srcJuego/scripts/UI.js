export class UI extends Phaser.Scene
{
    /**
  * Consturctor del player
  * @param {Phaser.Scene} scene escena donde esta el jugador
  * */
    constructor(scene) {
        super({ key: "UI" })
        this._playerScene = scene;
    }
    //data transfer
    init() {

    }
    preload() {

    }
    create() {
        var showLive = 1;//1 se muestra, 0 no

        const live_width = 350;
        const live_height = 50;
        var live_bar = new Phaser.Rectangle(this._playerScene.player.x, this._playerScene.player.y - live_height, live_width, live_height);
        var figura = game.add.graphics(0,0);
        figura.lineStyle(0, 0x000000).beginFill(0xff0000).drawShape(live_bar);
        figura.endFill();
        /*this.graphics = this.add.graphics({
            fillStyle: { color: 0xff0000 }
        });
        this.live_bar = new Phaser.Geom.Rectangel(this._playerScene.player.x, this._playerScene.player.y - live_height, live_width, live_height);*/
    }
    update() {
        /*this.graphics.clear();
        if (showLive = 1) {
            this.live_bar.width = this._playerScene.player._currentLife * live_width / this._playerScene.player._life
            this.graphics.fillRectShape(this.live_bar);
        }*/
    }

    ShowUI() { //metodo para ver que se muestra y que no
        /*if (porcentage mayor que rango) { //si dicotomia mayor que x% se muestra
            showLive = 1;
        }
        else {//si no no se muestra
            showLive = 0;
        }*/
    }
}