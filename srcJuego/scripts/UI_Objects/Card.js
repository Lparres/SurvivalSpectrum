import Button from "./Button.js"
export default class Card extends Phaser.GameObjects.Container{
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {string} stat stat y key del sprite de la carta a poner
     * @param {*} amount 
     */
    constructor(scene,x,y,stat, amount){

        super(scene,x,y)

        this.cardGB = new Button(scene,0,0,stat,1,()=>{
            if(scene.cardsToPick > 0){
                this.setVisible(false)
                scene.cardsToPick--;
            }
        },false).setOrigin(0,0)

        this.cardGB.setDisplaySize(100,140);
        this.add(this.cardGB);

        var textValue =scene.add.text(50, 100, stat, { font: '25px JosefinMedium', fill: '#424242' }).setOrigin(0.5, 0.5);
        this.add(textValue);
        this.scene.add.existing(this);
    }
}