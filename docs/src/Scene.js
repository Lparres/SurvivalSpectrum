import Player from './Player.js'

export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key:"level"})
    }
    //data transfer
    init(){

    }
    //load data
    preload(){
        //place holder
        this.load.image('kirby', './img/kirby.png');
    }
    //instance
    create(){
        //instancia del  jugador
        let playerConfig =
        {velocity: 2, 
            damage: 5, 
            range: 20, 
            armor: 10, 
            life: 100}
        this.player = new Player(this,960,540,'kirby', playerConfig);
        
        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');
        
    }
    //game tick
    update(){
        if(this.right.isDown){
            this.player.mover(1,0);
        }
        if(this.left.isDown){
            this.player.mover(-1,0);
        }
        if(this.up.isDown){
            this.player.mover(0,-1);
        }
        if(this.down.isDown){
            this.player.mover(0,1);
        }
    }
}
