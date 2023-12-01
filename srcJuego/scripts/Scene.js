import Player from './Player.js'
import MeleeEnemy from './MeleeEnemy.js'
import RangeEnemy from './RangeEnemy.js'
import Pool from './Pool.js'
import Bullet from './Bullet.js'
import Enemy from './Enemy.js'
import InteractuableObjects from './InteractuableObject.js'
export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key:"level"})
    }
    //data transfer
    init(){

    }
    //load data
    preload(){

        let srcJuego = 'srcJuego';
        //carga de imagenes y SpriteSheets
        this.load.image('kirby', srcJuego+ '/img/kirby.png');
        this.load.image('fondo', srcJuego+ '/img/fondo.jpg');  
        this.load.image('polvos', srcJuego+ '/img/polvos.jpg');   


        //this.load.image('player',srcJuego+ '/Sprites/Character/with_hands/death_0 - copia - copia.png');   
        this.load.spritesheet('player', srcJuego+'/sprites/Character/with_hands/SpriteSheets/walkSheet.png',
                      { frameWidth: 2048, frameHeight: 2048 });
        
        this.load.spritesheet('idlePlayer', srcJuego+'/sprites/Character/with_hands/SpriteSheets/idleSheet.png',
        { frameWidth: 2048, frameHeight: 2048 });

        //this.load.image('enemy', srcJuego+ '/Sprites/Enemy1/death_0.png');   
        this.load.spritesheet('enemy', srcJuego+'/sprites/Enemy1/SpriteSheets/walkSheet.png',
        { frameWidth: 2048, frameHeight: 2048 });
        

        //carga del tilemap
        this.load.tilemapTiledJSON('tilemap', srcJuego +'/tiled/prueba2.json');
        
        //carga del tileset
        this.load.image('patronesTilemap', srcJuego + '/tiled/arte/Dungeon_Tileset.png'); 
  
       
        
        /**caraga de json de datos de los distintos enemigos
         * 
         * tanto este como el siguente creo que necesitan una vuelta de tuerca para que nos sean todavia mas utiles
         * por ejemplo guardando la clave de animacion de ese tipo de enemigo entre otras cosas 
         * 
         * Por otra parte creo que es util ser conscientes que todos los objetos que tenemos en el juego tienen como mucho animaciones de
         * andar y de recibir danio (del feedback del danio creo que hace falta hablarlo)
         */
        this.load.json('data', 'srcJuego/scripts/JSON/data.json');

        this.load.json('waves', 'srcJuego/scripts/JSON/waves.json');     

    }

    //instance
    create(){//igual es recomendable que se haga una seccion de creacion de animaciones ya que asi ya estan listas cuando hagan falta

        this.waveData = {
            waveTime : 0,
            waveCount : 0
        }
        this.maxMasillaTime = 200;
        this.masillasTimer = 0;
        this.data = this.game.cache.json.get('data');
        this.wave = this.game.cache.json.get('waves');
        //imagen del fondo
        this.add.image(0, 0, 'fondo').setScale(2, 1.3).setOrigin(0, 0);     

        // Cursor personalizado
        this.input.setDefaultCursor('url(srcJuego/img/crosshair.png) 16 16, pointer');

        //creacion del jugador
        this.player = new Player(this, 960, 540, ['idlePlayer','PlayerMove'], this.data.PlayerConfig);
        //para orden de render
        this.player.setDepth(10);

        //creación de las animaciones del jugador
        this.anims.create({
            key: 'PlayerMove',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.anims.create({
            key: 'idlePlayer',
            frames: this.anims.generateFrameNumbers('idlePlayer', { start: 0, end: 5}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.inicializoPools();

        //creación de animaciones para enemigos
        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7}),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        //por ahora este metodo esta vacio pero asi se queda mas limpio el create
        //comentado para que no pete
        this.setTileMap();

        this.setCollisions();
        
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

        
        
    }

    //game tick
    update(){
        //console.log(this.waveTime);
        //actualizacion de temporizadores
        this.waveData.waveTime++;
        this.masillasTimer++;

        //actualizar el valor del vector del input
        this._inputVector.x = this.right.isDown == this.left.isDown ? 0 : this.right.isDown ? 1 : -1;
        this._inputVector.y = this.up.isDown == this.down.isDown ? 0 : this.up.isDown ? -1 : 1;

        // Modificamos el vector de movimiento del player a partir del inputVector
        this.player.SetDirection(this._inputVector);
        
        //prueba para detectar la posicion del raton
        //this.player.x = this.input.mousePointer.x;
        //this.player.y = this.input.mousePointer.y;
        

        /**esto me gustaria pasarlo a metodos tal vez pero por ahora se queda asi hasta que acordemos bien
         * un protocolo de oleadas/ masillas (tema que no aparezcan enemigos en muros y tal)
         */
        //oleadas
        if(this.waveData.waveTime > this.wave.Waves[0].timeBetween && this.waveData.waveCount <this.wave.Waves[0].size ){
            console.log(this.data.EnemyConfigs[0]);
            this.rangeEnemiesPool.spawn(this.wave.Waves[0].x,this.wave.Waves[0].y, 'enemyMove', this.data.RangeConfigs[0]);
            this.waveData.waveTime = 0;
            this.waveData.waveCount++;
        }

        //masillas
        if(this.masillasTimer > this.maxMasillaTime){
            let vector = new Phaser.Math.Vector2(0,0);
            let spawn = Phaser.Math.RandomXY(vector, Phaser.Math.Between(400, 1000));
            let enemyNumber = Phaser.Math.Between(0,2);
            //this.meleeEnemiesPool.spawn(Phaser.Math.Between(50, this.sys.game.canvas.width-100),
            //Phaser.Math.Between(50, this.sys.game.canvas.height-100),
            //'enemyMove', this.data.EnemyConfigs[2]);

            this.meleeEnemiesPool.spawn(this.player.x + spawn.x,this.player.y + spawn.y,
            'enemyMove', this.data.EnemyConfigs[enemyNumber]);
            this.masillasTimer = 0;
            this.maxMasillaTime = Phaser.Math.Between(100,250);
        }
        //Esta línea hace que la cámara siga al jugador
        this.cameras.main.startFollow(this.player);
    }
    /**inicializacion de la pools */
    inicializoPools(){
        
        // creacion de pools
        this.playerBulletsPool = new Pool(this, 100);//cambiar los magics numbers por constantes
        this.enemiesBulletsPool = new Pool(this, 200);
        this.meleeEnemiesPool = new Pool(this, 50);
        this.rangeEnemiesPool = new Pool(this, 50);
        this.dustPool = new Pool(this,100);

        
        let plBullets =[];

        for(let i = 0; i < 100;i++){
            let aux = new Bullet(this,0,0,'kirby',true, 0,0,this.playerBulletsPool);
            aux.setDepth(10);
            plBullets.push(aux);
        }

        //rellenar pool de balas del player
        this.playerBulletsPool.addMultipleEntity(plBullets);

        let enBullets =[];

        for(let i = 0; i < 100;i++){
            let aux = new Bullet(this,0,0,'kirby',true, 0,0,this.enemiesBulletsPool);
            aux.setDepth(10);
            enBullets.push(aux);
        }
        this.enemiesBulletsPool.addMultipleEntity(enBullets);

        let enemysArr = [];

        for(let i = 0; i < 100;i++){
            let aux = new Enemy(this,0,0,'enemyMove',this.meleeEnemiesPool);
            aux.setDepth(10);
            enemysArr.push(aux);
        }

        this.meleeEnemiesPool.addMultipleEntity(enemysArr);

        let rangeArr = [];

        for(let i = 0; i < 100;i++){
            let aux = new RangeEnemy(this,0,0,'enemyMove',this.rangeEnemiesPool);
            aux.setDepth(10);
            rangeArr.push(aux);
        }

        this.rangeEnemiesPool.addMultipleEntity(rangeArr);

        let dustArr = [];
        
        for(let i = 0; i < 100;i++){
            let aux = new InteractuableObjects(this,0,0,'polvos',this.dustPool, function(amount){
            aux.setDepth(10);

                //this.player.addDust(amount);
            });
            dustArr.push(aux);
        }

        this.dustPool.addMultipleEntity(dustArr);
    }
    /**configuracion de las colisiones y triggers */
    setCollisions(){
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
                console.log(enemy);
                player.Hit(enemy.damage, 1);
                enemy._CDMeleeTimer = enemy._meleeAttackCD;
            }
                
        });

        //colisiones entre el jugador y las balas de los enemigos
        this.physics.add.collider(this.player, this.enemiesBulletsPool.group, function (player, bullet){
            let dmg1 = bullet.damage;
            let dmg2 = player.health;
            //tengase en cuenta que si el jugador no tiene vida las balas no se desturyen (esto no va a pasar)
            bullet.Hit(dmg2, true);
            player.Hit(dmg1, 2);
        });

        this.physics.add.overlap(this.player, this.dustPool.group,function(player,dust){
            dust.Hit();
            player.addDust(dust.amount);
        })
    }

    /**configuracion del tile map */
    setTileMap(){
        
        // Objeto tilemap       
		this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});
        
   
		const tileset1 = this.map.addTilesetImage('Dungeon_Tileset', 'patronesTilemap');
		
		// creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('Suelo', tileset1);
		
		this.wallLayer = this.map.createLayer('Pared', tileset1);
		//this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones
		
        //colisiones
		this.wallLayer.setCollisionByExclusion([-1],true);

        //creacion del player desde el tilemap
		//this.mov = this.map.createFromObjects('Capa de objetos', {name: 'Player', classType: Player, key:"character"});

		//this.player = this.mov[0];


		// Ponemos la cámara principal de juego a seguir al jugador, ya esta 
		//this.cameras.main.startFollow(this.player);
		
		// Decimos que capas tienen colision entre ellas, esto hay que cambiarlo de sitio
		this.physics.add.collider(this.player, this.wallLayer);
		this.physics.add.collider(this.meleeEnemiesPool.group, this.wallLayer);
        
        // demasiada línea de código comentada y poco comentario explicando las clases
    }
}
