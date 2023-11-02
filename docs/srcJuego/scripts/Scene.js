import Player from './Player.js'
import MeleeEnemy from './MeleeEnemy.js'

export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key:"level"})
    }
    //data transfer
    init(){

    }
    //load data
    preload(){
        let srcJuego = 'https://lparres2000.github.io/JuegoPVLI/srcJuego';
        //place holder
        this.load.image('kirby', srcJuego+'/img/kirby.png');
        this.load.image('fondo', srcJuego+ '/img/fondo.jpg');   
        this.load.image('player',srcJuego+ '/Sprites/Character/with_hands/SpriteSheets');   
        this.load.image('enemy', srcJuego+ '/Sprites/Enemy1');   
    }
    //instance
    create(){
        this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0)

        this.bullets = this.add.group();
        this.enemys = this.add.group();

        this.physics.add.collider(this.bullets, this.enemys, function (proyectle, enemy){
            enemy.Hit(proyectle._damage);
            proyectle.Hit();
        });
        // Cursor personalizado
        this.input.setDefaultCursor('url(https://lparres2000.github.io/JuegoPVLI/srcJuego/img/crosshair.png), pointer');

        //instancia del  jugador
        let playerConfig =
        {velocity: 5, 
            damage: 5, 
            range: 20, 
            armor: 10, 
            life: 100,
            Cooldown:500,//van en milisegundos
        }
        //creacion del jugador
        this.player = new Player(this, 960, 540, 'kirby', playerConfig);


        //instancia de enemigo
        let enemyConfig =
        {
            life: 50,
            damage: 3,
            velocity: 2,
            minCooldown: 1,
            maxCooldown: 2,
        }
        //creacion del enemigo
        this.meleeEnemy = new MeleeEnemy(this, 500, 500, 'kirby', enemyConfig, 10);



        //variables para el input
        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');
        
        //no se si hace falta para leer input del mouse
        //this.input.mouse.capture = true;


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


        //prueba para detectar la posicion del raton
        //this.player.x = this.input.mousePointer.x;
        //this.player.y = this.input.mousePointer.y;
        
    }
}
