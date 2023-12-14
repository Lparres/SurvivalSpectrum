import Player from '../Objects/Player.js'
import RangeEnemy from '../Objects/RangeEnemy.js'
import Pool from '../Pool.js'
import Bullet from '../Objects/Bullet.js'
import Enemy from '../Objects/Enemy.js'
import InteractuableObjects from '../Objects/InteractuableObject.js'
import Dicotomías from '../Dicotomias.js'
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "level" })
    }
    //data transfer
    init() {

    }
    //load data
    preload() {

        let srcJuego = 'srcJuego';
        //carga de imagenes y SpriteSheets
        this.load.image('kirby', srcJuego + '/img/kirby.png');
        this.load.image('polvos', srcJuego + '/img/dust.png');


        //this.load.image('player',srcJuego+ '/Sprites/Character/with_hands/death_0 - copia - copia.png');   
        this.load.spritesheet('player', srcJuego + '/sprites/Character/with_hands/SpriteSheets/walkSheet.png',
            { frameWidth: 204, frameHeight: 204});

        this.load.spritesheet('idlePlayer', srcJuego + '/sprites/Character/with_hands/SpriteSheets/idleSheet.png',
            { frameWidth: 204, frameHeight: 204 });

        this.load.spritesheet('enemy1', srcJuego + '/sprites/Enemy1/SpriteSheets/walkSheet.png',
        { frameWidth: 204, frameHeight:204})

        this.load.spritesheet('enemy2', srcJuego + '/sprites/Enemy2/SpriteSheets/walk-Sheet.png',
        { frameWidth: 204, frameHeight:204})

        this.load.spritesheet('enemy3', srcJuego + '/sprites/Enemy3/SpriteSheets/fly-Sheet.png',
            { frameWidth: 204, frameHeight:204});

        this.load.spritesheet('enemy4', srcJuego + '/sprites/Enemy4/SpriteSheets/walk-Sheet.png',
        { frameWidth: 204, frameHeight:204});

        //carga del tilemap
        this.load.tilemapTiledJSON('tilemap', srcJuego + '/tiled/prueba2.json');

        //carga del tileset
        this.load.image('patronesTilemap', srcJuego + '/tiled/arte/Dungeon_Tileset.png');


        /**carga de json de datos de los distintos enemigos
         * 
         * tanto este como el siguente creo que necesitan una vuelta de tuerca para que nos sean todavia mas utiles
         * por ejemplo guardando la clave de animacion de ese tipo de enemigo entre otras cosas 
         * 
         * Por otra parte creo que es util ser conscientes que todos los objetos que tenemos en el juego tienen como mucho animaciones de
         * andar y de recibir danio (del feedback del danio creo que hace falta hablarlo)
         */
        this.load.json('data', 'srcJuego/scripts/JSON/data.json');

        this.load.json('waves', 'srcJuego/scripts/JSON/waves.json');

        //this.load.audio('music','srcJuego/audio/musica.mp3');

        this.cameras.main.zoom= 2;
    }

    //instance
    create() {//igual es recomendable que se haga una seccion de creacion de animaciones ya que asi ya estan listas cuando hagan falta

        this.data = this.game.cache.json.get('data');

        /**Explicacion del formato de las oleadas
         * Cada oleada está compuesta por, un waveStartTime(en segundos) y un array de spawnsData.
         * El waveStartTime, indica el segundo en el que empezará la oleada, cuando el reloj global llegue
         * a ese tiempo, se lanzará esa oleada. 
         * El array de spawnsData contiene la informacion de cada spawn,
         * la posicion de cada spawn se recalcula cada X tiempo(actualmente cada 5 segundos) y detetermina el
         * punto exacto del mapa en el que salen los enemigos
         * La informacion que contiene cada spawn es(de momento):
         * -type: range o melee, para saber el tipo de enemigo
         * -size: el numero de enemigos que hay en ese spawn point
         * -frecuency: cada cuantos segundos sale un enemigo en dicho spawn point
         * -timer: contador de tiempo, para ir sabiendo cuando toca spawnear y cuando no
         *
         * 
         */
        this.waveJson = this.game.cache.json.get('waves');

        this.currentWave = 0;

        this.spawnPositions =  [];

        this.minSpawnRange =  400;
        this.maxSpawnRange =  750;

        this.sortSpawnPointsFrecuency = 5000;
        this.sortSpawnPointsTimer = 9999;

        //para calcular cuando sale la nueva oleada
        this.globalTime = 0;

        // Cursor personalizado
        this.input.setDefaultCursor('url(srcJuego/img/crosshair.png) 16 16, pointer');

        //creacion del jugador
        this.player = new Player(this, 960, 540, ['idlePlayer', 'PlayerMove'], this.data.PlayerConfig);

        this.dicotomyManager = new Dicotomías(this.player, 50, 50, 50, 50);
        this.dicotomyManager.AplieDicotomy(1);
        this.dicotomyManager.AplieDicotomy(2);

        //para orden de render
        this.player.setDepth(10);

        //inicializar las pools
        this.setPools();

        //creacion de las animaciones
        this.setAnimations();

        //creacion del tilemap y variables asociadas
        this.setTileMap();

        //ajuste de las colisiones
        this.setCollisions();

        //#endregion

        //this. boton = new Button(this,200,200,'kirby',function(){console.log("tu vieja")});
        //variables para el input
        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');

        this.esc = this.input.keyboard.addKey('ESC');


        this.esc.on('down', event => {
            this.scene.sleep('UIScene');
            this.scene.launch('Menu');
            this.scene.setActive(false);
        });
        // Recogida del input de movimiento en un vector
        this._inputVector = new Phaser.Math.Vector2(0, 0);

        //booleano que detiene el movimiento de los enemigos
        this.stopEnemy = false;

        // this es Scene
       let lifeRegenEvent = this.time.addEvent( {
            delay: 3000, 
            callback: this.onEvent,
            callbackScope: this,
            loop: true
        });
       //this.music = this.sound.add('music',{volume: 0.05,loop:true});
       //this.music.play();
    }

            
    onEvent(){
        this.player.lifeRegen(2);
    };

    //game tick
    update(t, dt) {

        this.playerMove();

        this.oleadasLogic(dt);

        this.masillasLogic(dt);

        //la cámara sigue al jugador
        this.cameras.main.startFollow(this.player);
    }

    /**inicializacion de la pools */
    setPools() {

        // creacion de pools
        this.playerBulletsPool = new Pool(this, 20);//cambiar los magics numbers por constantes
        this.enemiesBulletsPool = new Pool(this, 200);
        this.meleeEnemiesPool = new Pool(this, 50);
        this.rangeEnemiesPool = new Pool(this, 50);
        this.dustPool = new Pool(this, 100, 'polvos');


        let plBullets = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Bullet(this, 0, 0, 'kirby', true, 0, 0, this.playerBulletsPool);
            aux.setDepth(10);
            plBullets.push(aux);
        }

        //rellenar pool de balas del player
        this.playerBulletsPool.addMultipleEntity(plBullets);

        let enBullets = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Bullet(this, 0, 0, 'kirby', true, 0, 0, this.enemiesBulletsPool);
            aux.setDepth(10);
            enBullets.push(aux);
        }
        this.enemiesBulletsPool.addMultipleEntity(enBullets);

        let enemysArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Enemy(this, 0, 0, ['enemyMove1', 'enemyMove4'], this.meleeEnemiesPool);
            aux.setDepth(10);
            enemysArr.push(aux);
        }

        this.meleeEnemiesPool.addMultipleEntity(enemysArr);

        let rangeArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new RangeEnemy(this, 0, 0, ['enemyMove1', 'enemyMove4'], this.rangeEnemiesPool);
            aux.setDepth(10);
            rangeArr.push(aux);
        }

        this.rangeEnemiesPool.addMultipleEntity(rangeArr);

        let dustArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new InteractuableObjects(this, 0, 0, 'polvos', this.dustPool, (amount) => {
                //aux.setDepth(10);
                this.player.addDust(amount);
            });
            dustArr.push(aux);
        }

        this.dustPool.addMultipleEntity(dustArr);
    }
    /**configuracion de las colisiones y triggers */
    setCollisions() {
        //colision entre enemigos
        this.physics.add.collider(this.meleeEnemiesPool.group, this.meleeEnemiesPool.group);
        this.physics.add.collider(this.rangeEnemiesPool.group, this.rangeEnemiesPool.group);
        this.physics.add.collider(this.meleeEnemiesPool.group, this.rangeEnemiesPool.group);
        //colisiones entre las balas del jugador y los enemigos melee
        this.physics.add.collider(this.playerBulletsPool.group, this.meleeEnemiesPool.group, function (proyectle, enemy) {
            let dmg1 = proyectle.damage;
            let dmg2 = enemy.health;
            enemy.Hit(dmg1);
            proyectle.Hit(dmg2, false);
            enemy.scene.player.addEureka();
        });
        //colisiones entre las balas del jugador y los enemigos a rango
        this.physics.add.collider(this.playerBulletsPool.group, this.rangeEnemiesPool.group, function (proyectle, enemy) {
            let dmg1 = proyectle.damage;
            let dmg2 = enemy.health;
            enemy.Hit(dmg1);
            proyectle.Hit(dmg2, false);
            enemy.scene.player.addEureka()
        });


        //colisiones entre el jugador y los enemigos melee
        this.physics.add.collider(this.player, this.meleeEnemiesPool.group, function (player, enemy) {

            // Si el enemigo está listo para atacar, el player recibe un golpe y se reinicia el cooldown del ataque del enemigo.
            if (enemy._CDMeleeTimer <= 0) {
                //console.log(enemy);
                player.Hit(enemy.damage, 1);
                enemy._CDMeleeTimer = enemy._meleeAttackCD;
                player.addRage();
            }
        });

        //colisiones entre el jugador y los enemigos de rango
        this.physics.add.collider(this.player, this.rangeEnemiesPool.group, function (player, enemy) {

            //falta rellenar, seguramente se muy similar a los enemigos meele
        });


        //colisiones entre el jugador y las balas de los enemigos
        this.physics.add.collider(this.player, this.enemiesBulletsPool.group, function (player, bullet) {
            let dmg1 = bullet.damage;
            let dmg2 = player.health;
            //tengase en cuenta que si el jugador no tiene vida las balas no se desturyen (esto no va a pasar)
            bullet.Hit(dmg2, true);
            player.Hit(dmg1, 2);

            //console.log(bullet.health);
            player.addRage();
        });


        //colisiones con el trigger de los polvos
        this.physics.add.overlap(this.player, this.dustPool.group, function (player, dust) {
            dust.Hit();
            player.addDust(dust.amount);
        })

        // Colisiones de las capas del tilemap

        //decimos que las paredes tienen colisiones
        this.wallLayer.setCollisionByExclusion([-1], true);

        //añadimos las colisiones de los objetos con las capas
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.meleeEnemiesPool.group, this.wallLayer);
        this.physics.add.collider(this.rangeEnemiesPool.group, this.wallLayer);


        //faltan las colisiones de las balas con las paredes
        this.physics.add.collider(this.playerBulletsPool.group,this.wallLayer, function(bullet,wall){
            bullet.Hit(bullet.health);
        })
        this.physics.add.collider(this.enemiesBulletsPool.group,this.wallLayer, function(bullet,wall){
            bullet.Hit(bullet.health);
        })


    }

    /**configuracion del tile map */
    setTileMap() {

        // Objeto tilemap       
        this.map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 32,
            tileHeight: 32
        });

        //tileset
        const tileset1 = this.map.addTilesetImage('Dungeon_Tileset', 'patronesTilemap');

        // creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
        this.groundLayer = this.map.createLayer('Suelo', tileset1);
        this.wallLayer = this.map.createLayer('Pared', tileset1);


        //creamos el array de spawn points
        this.spawnPoints = this.map.createFromObjects('Spawns');


        //los hacemos invisibles para que no se vean
        for (let i = 0; i < this.spawnPoints.length; i++) {
            this.spawnPoints[i].setVisible(false);
        }

    }

    setAnimations() {
        //creación de las animaciones del jugador
        this.anims.create({
            key: 'PlayerMove',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.anims.create({
            key: 'idlePlayer',
            frames: this.anims.generateFrameNumbers('idlePlayer', { start: 0, end: 5 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        //creación de animaciones para enemigos
        this.anims.create({
            key: 'enemyMove1',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 7 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.anims.create({
            key: 'enemyMove2',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 7 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.anims.create({
            key: 'enemyMove3',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 5 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

        this.anims.create({
            key: 'enemyMove4',
            frames: this.anims.generateFrameNumbers('enemy4', { start: 0, end: 7 }),
            frameRate: 10, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
    }


    playerMove() {
        //actualizar el valor del vector del input
        this._inputVector.x = this.right.isDown == this.left.isDown ? 0 : this.right.isDown ? 1 : -1;
        this._inputVector.y = this.up.isDown == this.down.isDown ? 0 : this.up.isDown ? -1 : 1;

        // Modificamos el vector de movimiento del player a partir del inputVector
        this.player.SetDirection(this._inputVector);
    }


    //oleadas
    oleadasLogic(dt) {

        this.globalTime  = (this.scene.get("UIScene").minuteCount*60)+ this.scene.get("UIScene").secondsCount;

        //si ha llegado el tiempo de la siguiente oleada, cambiar de oleada,y actualizar spawnPoints
        if(this.globalTime >= this.waveJson.NewWaves[this.currentWave +1].waveStartTime ){
            this.currentWave = this.currentWave+1;
            this.sortSpawnPoints();
            this.sortSpawnPointsTimer = 0;

            //actualizar la info de la UI
            this.scene.get("UIScene").updateWaveData();
        }

        //actualizar la posicion de los spawnPoints, cuando toque

        this.sortSpawnPointsTimer += dt;

        if(this.sortSpawnPointsTimer >= this.sortSpawnPointsFrecuency){
            this.sortSpawnPoints();
            this.sortSpawnPointsTimer = 0;
        }
        

        //para cada uno de los spawns de la oleada actual
        for(let i = 0; i < this.waveJson.NewWaves[this.currentWave].spawnsData.length ;i++){
            
            //actualizar el contador de tiempo
            this.waveJson.NewWaves[this.currentWave].spawnsData[i].timer += dt;

            //si toca spawnear y quedan enemigos en este spawn point
            if(this.waveJson.NewWaves[this.currentWave].spawnsData[i].timer >=
                this.waveJson.NewWaves[this.currentWave].spawnsData[i].frecuency && 
                this.waveJson.NewWaves[this.currentWave].spawnsData[i].size >0 ) 
            {
                
                //spawneo del enemigo en su spawnPoint 
                
                //spawnear segun el tipo
                if(this.waveJson.NewWaves[this.currentWave].spawnsData[i].type == "melee"){
                    this.meleeEnemiesPool.spawn(this.spawnPositions[i].x,this.spawnPositions[i].y,'enemyMove1',this.data.EnemyConfigs[0]);
                }
                else if(this.waveJson.NewWaves[this.currentWave].spawnsData[i].type == "range"){
                    this.rangeEnemiesPool.spawn(this.spawnPositions[i].x,this.spawnPositions[i].y,'enemyMove1',this.data.RangeConfigs[0]);
                }
                
                
                //resetear el timer
                this.waveJson.NewWaves[this.currentWave].spawnsData[i].timer = 0;
                //disminuir el tamaño
                this.waveJson.NewWaves[this.currentWave].spawnsData[i].size--;
            }

        }
    }

    //masillas, cambiar a logica de las oleadas
    masillasLogic(dt) {

          //para cada uno de los spawns de las masillas
          for(let i = 0; i < this.waveJson.Masillas[0].spawnsData.length ;i++){
            
            //actualizar el contador de tiempo
            this.waveJson.Masillas[0].spawnsData[i].timer += dt;

            //si toca spawnear y quedan enemigos en este spawn point
            if(this.waveJson.Masillas[0].spawnsData[i].timer >=
                this.waveJson.Masillas[0].spawnsData[i].frecuency) 
            {
                
                //spawneo del enemigo en su spawnPoint 
                
                //spawnear segun el tipo
                if(this.waveJson.Masillas[0].spawnsData[i].type == "melee"){
                    this.meleeEnemiesPool.spawn(this.spawnPositions[i].x,this.spawnPositions[i].y,'enemyMove',this.data.EnemyConfigs[0]);
                }
                else if(this.waveJson.Masillas[0].spawnsData[i].type == "range"){
                    this.rangeEnemiesPool.spawn(this.spawnPositions[i].x,this.spawnPositions[i].y,'enemyMove',this.data.RangeConfigs[0]);
                }
                
                //console.log("masillasssss")
                
                //resetear el timer
                this.waveJson.Masillas[0].spawnsData[i].timer = 0;
            }

        }     
    }


    sortSpawnPoints() {
        
        //array de posiciones final, lo reseteamos
        this.spawnPositions = [];

        //i, contador de posiciones validas encontradas
        let i = 0;

        let playerPos = new Phaser.Math.Vector2(this.player.x,this.player.y);

        let j = 0;
        //mientras no haya encontrado los puntos suficientes
        while(i < this.waveJson.NewWaves[this.currentWave].spawnsData.length){
            
            //j, contador para recorrer los spawnPoint del array en el que estan todos
            let encontrado = false;
            //buscar un punto de los spawnPoints
            while(!encontrado && j < this.spawnPoints.length){

                //si cumple la condicion y no estaba antes, añadirlo
                let point = new Phaser.Math.Vector2(this.spawnPoints[j].x,this.spawnPoints[j].y);
                let distance = playerPos.distance(point);

                //si está en el rango
                if(distance >= this.minSpawnRange && distance <= this.maxSpawnRange){

                    let enLaOtraLista = false;
                    let k = 0;

                    //verificar que no esté ya en la lista definitiva
                    while(!enLaOtraLista && k < this.spawnPositions.length){
                        
                        if(point.x == this.spawnPositions[k].x &&
                            point.y == this.spawnPositions[k].y ){
                                enLaOtraLista = true;
                            }
                        k++;
                    }

                    //si no estaba en la otra lista, añadirlo
                    if(!enLaOtraLista){
                        this.spawnPositions.push(point);
                        encontrado = true;
                    }

                }

                j++;
            }


            i++;

        }
    }

    /**
     * método que detiene el tiempo al llegar el eureka
     * @param {boolean} value 
     */
    isTimeToStop(value){
        this.stopEnemy = value ;
        
    }
}