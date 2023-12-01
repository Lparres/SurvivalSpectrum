export default class UI extends Phaser.Scene    
{
   
    constructor() {
        super({ key: 'UIScene', active: true });
        this.time = 0;
        this.info;
        this.fill1;
    }
    //data transfer
    init() {

    }
    preload () {
            this.load.atlas('ui', 'srcJuego/ui/TextureAtlas.png', 'srcJuego/ui/AtlasUI.json');

    }
    create() {
        
        this.fill1 = this.add.nineslice(100, 1000, 'ui', 'NewHero_01.png', 1000, 50, 10, 10, 10,10     );

        this.fill1.setOrigin(0, 0.5);

        // this.tweens.add({
        //     targets: fill1,
        //     width: 800,
        //     duration: 3000,
        //     ease: 'sine.inout',
        //     yoyo: true,
        //     repeat: -1,
        // });

        this.info = this.add.text(10, 10, 'Time: 0', { font: '48px Arial', fill: 'white' });
        
    }
    update() {
        const ourGame = this.scene.get('level');
        


        if(ourGame.player != undefined){
            this.info.setText(ourGame.player.health);

            this.fill1.width = ourGame.player.health;

            console.log (ourGame.player.health);
        }
       
    }
}