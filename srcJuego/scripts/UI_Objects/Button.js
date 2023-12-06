export default class Button extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key,func){
        super(scene, x,y, key);
        this.setScale(0.15,0.15);
        this.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown',function(){
            func();
            //this.setActive(false);
            //this.disableInteractive();
            //this.setVisible(false);
        })
        this.on('pointerout',function(){
            console.log("fuera")
            this.setScale(0.15,0.15);
        })
        this.on('pointerover',function(){
            console.log("encima")
            this.setScale(0.20,0.20);
        })
    }
}