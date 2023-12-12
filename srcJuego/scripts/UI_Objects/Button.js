export default class Button extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} key 
     * @param {number} baseScale escala a la que poner el sprite designado
     * @param {*} func 
     */
    constructor(scene, x, y, key,baseScale,func){
        super(scene, x,y, key);
        this.setScale(baseScale,baseScale);
        this.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown',function(){
            func();
            //this.setActive(false);
            //this.disableInteractive();
            //this.setVisible(false);
        })
        this.on('pointerout',function(){
            //console.log("fuera")
            this.setScale(baseScale,baseScale);
        })
        this.on('pointerover',function(){
            //console.log("encima")
            this.setScale(baseScale+0.05,baseScale+0.05);
        })
    }
    preUpdate(t,dt){
        //console.log("antonio");
    }
}