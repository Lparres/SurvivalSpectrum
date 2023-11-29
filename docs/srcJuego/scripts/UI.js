export default class UI extends Phaser.Scene    
{
   
    constructor() {
        super({ key: 'UIScene', active: true });
        this.time = 0;
        this.info;
    }
    //data transfer
    init() {

    }
    preload() {

    }
    create() {
        

        this.info = this.add.text(10, 10, 'Time: 0', { font: '48px Arial', fill: 'white' });
        
    }
    update() {
        const ourGame = this.scene.get('level');



        if(ourGame.player != undefined){
            this.info.setText(ourGame.player.health);

        }
       
    }
}