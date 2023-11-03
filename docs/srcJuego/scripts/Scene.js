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

        //carga de imagenes y SpriteSheets
        this.load.image('kirby', srcJuego+ '/img/kirby.png');
        this.load.image('fondo', srcJuego+ '/img/fondo.jpg');   

        //this.load.image('player',srcJuego+ '/Sprites/Character/with_hands/death_0 - copia - copia.png');   
        this.load.spritesheet('player', srcJuego+'/Sprites/Character/with_hands/SpriteSheets/walkSheet.png',
                      { frameWidth: 2048, frameHeight: 2048 });

        //this.load.image('enemy', srcJuego+ '/Sprites/Enemy1/death_0.png');   
        this.load.spritesheet('enemy', srcJuego+'/Sprites/Enemy1/SpriteSheets/walkSheet.png',
        { frameWidth: 2048, frameHeight: 2048 });

    }
    //instance
    create(){
        //imagen del fondo
        this.add.image(0, 0, 'fondo').setScale(2, 1.3).setOrigin(0, 0);

        
        //grupos de colisiones
        this.bullets = this.add.group();
        this.enemys = this.add.group();
        
        

        //colisiones entre las balas y los enemigos
        this.physics.add.collider(this.bullets, this.enemys, function (proyectle, enemy){
            enemy.Hit(proyectle._damage);
            proyectle.Hit();
        });

        
        //colision entre enemigos
        this.physics.add.collider(this.enemys, this.enemys);

        
        
        

        // Cursor personalizado
        this.input.setDefaultCursor('url(https://lparres2000.github.io/JuegoPVLI/srcJuego/img/crosshair.png), pointer');

        //instancia del  jugador
        let playerConfig =
        {velocity: 300, 
            damage: 5, 
            range: 20, 
            armor: 10, 
            life: 120,
            Cooldown:500,//van en milisegundos
        }

        //creacion del jugador
        this.player = new Player(this, 960, 540, 'player', playerConfig);

        //creación de las animaciones del jugador
        this.anims.create({
            key: 'PlayerMove',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });



        //colisiones entre el jugador y los enemigos
        this.physics.add.collider(this.player, this.enemys, function (player, enemy){
            //player.bodydamage...
            //enemy.cooldown bodydamage...
            //anular las fuerzas?
            
        });

        //instancia de enemigo
        let enemyConfig =
        {
            life: 50,
            damage: 3,
            velocity: 100,
            minCooldown: 1,
            maxCooldown: 2,
        }
        //creacion del enemigo, para que funcionen bien las fisicas no deben crearse 2 objetos chocando
        this.meleeEnemy = new MeleeEnemy(this, 500, 500, 'enemy', enemyConfig, 10);
        this.meleeEnemy = new MeleeEnemy(this, 400, 200, 'enemy', enemyConfig, 10);
        this.meleeEnemy = new MeleeEnemy(this, 400, 800, 'enemy', enemyConfig, 10);
        this.meleeEnemy = new MeleeEnemy(this, 900, 250, 'enemy', enemyConfig, 10);

        //creación de animaciones para enemigos
        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });



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

        
        if(this.physics.collide(this.enemys, this.enemys)) {
            console.log("colision entre enemigos");
        }
        
        //prueba para detectar la posicion del raton
        //this.player.x = this.input.mousePointer.x;
        //this.player.y = this.input.mousePointer.y;
        
        //Esta línea hace que la cámara siga al jugador
        //this.cameras.main.startFollow(this.player);
    }
}
