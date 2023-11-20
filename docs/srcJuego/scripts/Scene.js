import Player from './Player.js'
import MeleeEnemy from './MeleeEnemy.js'
import RangeEnemy from './RangeEnemy.js'
import Pool from './Pool.js'
import Bullet from './Bullet.js'
import Enemy from './Enemy.js'
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

        /**let srcJuego = 'srcJuego';

        //carga de imagenes y SpriteSheets
        this.load.image('kirby', srcJuego+ '/img/kirby.png');
        this.load.image('fondo', srcJuego+ '/img/fondo.jpg');   

        //this.load.image('player',srcJuego+ '/Sprites/Character/with_hands/death_0 - copia - copia.png');   
        this.load.spritesheet('player', srcJuego+'/Sprites/Character/with_hands/SpriteSheets/walkSheet.png',
                      { frameWidth: 2048, frameHeight: 2048 });

        //this.load.image('enemy', srcJuego+ '/Sprites/Enemy1/death_0.png');   
        this.load.spritesheet('enemy', srcJuego+'/Sprites/Enemy1/SpriteSheets/walkSheet.png',
        { frameWidth: 2048, frameHeight: 2048 });
        

        //carga del tilemap
        this.load.tilemapTiledJSON('tilemap', '../Tiled/prueba..tmj');
        
        //carga del tileset
        this.load.image('patronesTilemap', '../Tiled/arte/Dungeon_Tileset.png'); */
    }
    //instance
    create(){

        //imagen del fondo
        this.add.image(0, 0, 'fondo').setScale(2, 1.3).setOrigin(0, 0);     

        // Cursor personalizado
        this.input.setDefaultCursor('url(srcJuego/img/crosshair.png) 16 16, pointer');

        //instancia del  jugador
        let playerConfig =
        {velocity: 300, 
            damage: 5, 
            range: 20, 
            meleeArmor: 100,
            rangeArmor: 100,
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



        // creacion de pools
        this.playerBulletsPool = new Pool(this, 100);//cambiar los magics numbers por constantes
        this.enemiesBulletsPool = new Pool(this, 200);
        this.meleeEnemiesPool = new Pool(this, 50);
        this.rangeEnemiesPool = new Pool(this, 50);

        
        let plBullets =[];

        for(let i = 0; i < 100;i++){
            let aux = new Bullet(this,0,0,'kirby',true, 0,0,this.playerBulletsPool);
            plBullets.push(aux);
        }

        //rellenar pool de balas del player
        this.playerBulletsPool.addMultipleEntity(plBullets);

        let enBullets =[];

        for(let i = 0; i < 100;i++){
            let aux = new Bullet(this,0,0,'kirby',true, 0,0,this.enemiesBulletsPool);
            enBullets.push(aux);
        }
        this.enemiesBulletsPool.addMultipleEntity(enBullets);

        let enemysArr = [];

        for(let i = 0; i < 100;i++){
            let aux = new Enemy(this,0,0,'enemyMove',this.meleeEnemiesPool);
            enemysArr.push(aux);
        }

        this.meleeEnemiesPool.addMultipleEntity(enemysArr);

        let rangeArr = [];

        for(let i = 0; i < 100;i++){
            let aux = new RangeEnemy(this,0,0,'enemyMove',this.rangeEnemiesPool);
            rangeArr.push(aux);
        }

        this.rangeEnemiesPool.addMultipleEntity(rangeArr);

        //grupos de colisiones
  
        //this.playerBullets = this.add.group();
        //this.enemiesBullets = this.add.group();
        //this.enemys = this.add.group();       
        

        //instancia de enemigo
        var enemyConfig =
        {
            life: 50,
            meleeDamage: 3,
            velocity: 100,
            meleeAttackCD: 500,
        }

        let enemyRangeConfig = 
        {
            settingMelee : enemyConfig,
            range: 10,
            rangeDamage: 5,
            rangeAttackCD: 1000,
            bulletSpeed: 500,
        }

        //creacion de  enemigos, para que funcionen bien las fisicas no deben crearse 2 objetos chocando
        //new MeleeEnemy(this, 500, 500, 'enemy', enemyConfig, 10);
        //new MeleeEnemy(this, 400, 200, 'enemy', enemyConfig, 10);
        //new MeleeEnemy(this, 400, 800, 'enemy', enemyConfig, 10);
        this.meleeEnemiesPool.spawn(500, 500, 'enemyMove', enemyConfig);
        this.rangeEnemiesPool.spawn(500, 200, 'enemyMove', enemyRangeConfig);

        //
        //new RangeEnemy(this, 900, 250, 'enemy', enemyConfig, enemyRangeConfig);

        //creación de animaciones para enemigos
        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });



     
        //#region Collision
        //colision entre enemigos
        this.physics.add.collider(this.meleeEnemiesPool.group, this.meleeEnemiesPool.group);
        this.physics.add.collider(this.rangeEnemiesPool.group, this.rangeEnemiesPool.group);
        this.physics.add.collider(this.meleeEnemiesPool.group, this.rangeEnemiesPool.group);

        //colisiones entre las balas y los enemigos
        this.physics.add.collider(this.playerBulletsPool.group, this.meleeEnemiesPool.group, function (proyectle, enemy){
            let dmg1 = proyectle.damage;
            let dmg2 = enemy.health;
            enemy.Hit(dmg1);
            proyectle.Hit(dmg2, false);
        });
        //colisiones entre las balas y los enemigos a rango
        this.physics.add.collider(this.playerBulletsPool.group, this.rangeEnemiesPool.group, function (proyectle, enemy){
            let dmg1 = proyectle.damage;
            let dmg2 = enemy.health;
            enemy.Hit(dmg1);
            proyectle.Hit(dmg2, false);
        });
        //colisiones entre el jugador y los enemigos
        this.physics.add.collider(this.player, this.meleeEnemiesPool.group, function (player, enemy){

            // Si el enemigo está listo para atacar, el player recibe un golpe y se reinicia el cooldown del ataque del enemigo.
            if(enemy._CDMeleeTimer <= 0){
                player.Hit(enemy._meleeDamage, 1);
                enemy._CDMeleeTimer = enemy._meleeAttackCD
            }
                
        });

        //colisiones entre el jugador y las balas de los enemigos
        this.physics.add.collider(this.player, this.enemiesBulletsPool.group, function (player, bullet){
            let dmg1 = bullet.damage;
            let dmg2 = player._currentLife;
            bullet.Hit(dmg2, true);
            player.Hit(dmg1, 2);
        });
    //#endregion


        //variables para el input
        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');
        
        //no se si hace falta para leer input del mouse
        //this.input.mouse.capture = true;

        // Recogida del input de movimiento en un vector
        this._inputVector = new Phaser.Math.Vector2(0,0);



        /**
        * 
        // Objeto tilemap
		this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

   
		const tileset1 = this.map.addTilesetImage('Dungeon_Tileset.tsx', 'patronesTilemap');
		
		// creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('Suelo', tileset1);
		
		this.wallLayer = this.map.createLayer('Pared', tileset1);
		this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones
		
		
		this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:"character"});
		let player = this.mov[0];


		// Ponemos la cámara principal de juego a seguir al jugador
		this.cameras.main.startFollow(player);
		
		// Decimos que capas tienen colision entre ellas
		this.physics.add.collider(player, this.wallLayer);
		this.physics.add.collider(player, coinsGroup, this.aux);
		this.physics.add.collider(coinsGroup, this.wallLayer);
		
		this.physics.add.collider(player, this.baseColumnLayer);
		this.physics.add.collider(coinsGroup, this.baseColumnLayer);		
        */
        
    }

    //game tick
    update(){

        //actualizar el valor del vector del input
        this._inputVector.x = this.right.isDown == this.left.isDown ? 0 : this.right.isDown ? 1 : -1;
        this._inputVector.y = this.up.isDown == this.down.isDown ? 0 : this.up.isDown ? -1 : 1;

        // Modificamos el vector de movimiento del player a partir del inputVector
        this.player.setMoveVector(this._inputVector);

        /**
         * Debug para las colisiones entre enemigos
        if(this.physics.collide(this.enemys, this.enemys)) {
            console.log("colision entre enemigos");
        }
        */
        
        //prueba para detectar la posicion del raton
        //this.player.x = this.input.mousePointer.x;
        //this.player.y = this.input.mousePointer.y;
        
        //Esta línea hace que la cámara siga al jugador
        //this.cameras.main.startFollow(this.player);
    }
}
