import Button from "../UI_Objects/Button.js";

export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:"Menu"});
    }
    init(){

    }
    preload(){

    }
    create(){
        var centro = this.add.container(this.sys.game.canvas.width / 2,this.sys.game.canvas.height/2);
        const fondo = this.add.rectangle( 0, 0, 1000, 1000, 0x6666ff);
        
        
        const unpause = new Button(this,-400,-400,'heart',()=>{
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Menu');
            MainScene.scene.setActive(true);
        })
        this.card = new Button(this,300,600,'kirby',()=>{});
        
        centro.add(fondo);
        centro.add(unpause);
    }
}