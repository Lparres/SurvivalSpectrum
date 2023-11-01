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
        this.load.image('kirby', '../srcJuego/img/kirby.png');   
    }
    //instance
    create(){

        // Cursor personalizado
        this.input.setDefaultCursor('url(../srcJuego/img/crosshair.png), pointer');

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

        // Recogida del input de movimiento en un vector
        this._inputVector = new Phaser.Math.Vector2(0,0);

        if(this.right.isDown){
            this._inputVector.x += 1;
        }
        if(this.left.isDown){
            this._inputVector.x -= 1;
        }
        if(this.up.isDown){
            this._inputVector.y -= 1;
        }
        if(this.down.isDown){
            this._inputVector.y += 1;
        }
        
        // Modificamos el vector de movimiento del player a partir del inputVector
        this.player.setMoveVector(this._inputVector);
    }
}
