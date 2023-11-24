export class UI extends Phaser.Scene
{
   
    constructor() {
        super({ key: 'UI' })
    }
    //data transfer
    init() {

    }
    preload() {

    }
    create() {
        const ourGame = this.scene.get('level');

        let seg = 0;
        let min = 0;
        const info = this.add.text(10, 10, 'Time: 0:0', { font: '48px Arial', fill: '#000000' });

        var showLive = 1;//1 se muestra, 0 no

        const live_width = 350;
        const live_height = 50;
        this.live_bar = new Phaser.Rectangle(100, 100, live_width, live_height);
        //var live_bar = new Phaser.Rectangle(this._playerScene.player.x, this._playerScene.player.y - live_height, live_width, live_height);
        var figura = game.add.graphics(0,0);
        figura.lineStyle(0, 0x000000).beginFill(0xff0000).drawShape(this.live_bar);
        figura.endFill();
        this.timer = this.time.addEvent({
            delay:1000,
            callback: this.tiempo,
            callbackScope: this,
            loop: true
        })
        
        tiempo ()
        {
            seg = seg + 1;
            if(seg = 60){
                min = min + 1;
                seg = 0;
            }
            console.log("tiempo");
            info.setText(`Score: ${this.min}:${this.seg}`);
        }

        ourGame.events.on('barraVida', function (x, y, currentLife, life)
        {
            console.log("vida");
            if(showLive == 1)
            {
                this.live_bar = new Phaser.Rectangle(x, y-live_height, currentLife * live_width / life, live_height);
                figura.clear();
                figura.lineStyle(0, 0x000000).beginFill(0xff0000).drawShape(this.live_bar);
                figura.endFill();
            }
        }, this);
        
    }
    update() {
        
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