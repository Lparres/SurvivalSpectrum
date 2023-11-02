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
        this.load.image('kirby', 'https://lparres2000.github.io/JuegoPVLI/srcJuego/img/kirby.png');   
    }
    //instance
    create(){

        // Cursor personalizado
        this.input.setDefaultCursor('url(https://lparres2000.github.io/JuegoPVLI/srcJuego/img/crosshair.png), pointer');

        //instancia del  jugador
        let playerConfig =
        {velocity: 2, 
            damage: 5, 
            range: 20, 
            armor: 10, 
            life: 100}
        this.player = new Player(this,960,540,'kirby', playerConfig);
        
        //variables para el input
        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');
        
        
        // Recogida del input de movimiento en un vector
        this._inputVector = new Phaser.Math.Vector2(0,0);
    }
    //game tick
    update(){

        //actualizar el valor del vector del input
        this._inputVector.x = this.right.isDown == this.left.isDown ? 0 : this.right.isDown ? 1 : -1;
        this._inputVector.y = this.up.isDown == this.down.isDown ? 0 : this.up.isDown ? -1 : 1;

        // Modificamos el vector de movimiento del player a partir del inputVector
        this.player.setMoveVector(this._inputVector);
    }
}
