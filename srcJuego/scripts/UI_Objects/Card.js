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

        this.cardGB = new Button(scene,0,0,'cardBG',1,()=>{
            if(scene.cardsToPick > 0){
                this.setVisible(false)
                scene.updateCardsLeft();
                this.scene.scene.get('level').player.applyCard(stat);
            }
        },false).setOrigin(0,0)

        this.cardGB.setDisplaySize(100,140);
        this.add(this.cardGB);

        this.add(scene.add.nineslice(50, 60, 'stats', stat, 70,70, 5, 5, 5, 5));

        var textValue =scene.add.text(50, 110,"+"+ amount, 
        { font: '25px JosefinMedium', fill: '#424242' }).setOrigin(0.5, 0.5);
        this.add(textValue);
        this.scene.add.existing(this);
    }
}