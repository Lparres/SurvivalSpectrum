import Player from '../Objects/Player.js'
import RangeEnemy from '../Objects/RangeEnemy.js'
import Pool from '../Pool.js'
import Bullet from '../Objects/Bullet.js'
import Enemy from '../Objects/Enemy.js'
import InteractuableObjects from '../Objects/InteractuableObject.js'
import Dicotomías from '../Dicotomias.js'
import Card from '../Card.js'
import Dust from '../Objects/Dust.js'
import Totem from '../Objects/Totem.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "level" })
    }
    //data transfer
    init() {

    }
    //load data
    preload() {

        this.load.on('complete',()=>{
            this.scene.run('UIScene');
        });

        this.cameras.main.zoom = 2;
    }

    //instance
    create() {

        this.data = this.game.cache.json.get('data');

        
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
        this.player = new Player(this, 960, 540, ['idlePlayer', 'PlayerMove','deathPlayer'], this.data.PlayerConfig);

        
        this.cardMap = {
            life: 0,
            lifeRegen:0,
            damage: 0,
            fireRate:0,
            meleeArmor: 0,
            rangeArmor: 0,
            speed:0
        }
        this.statKeyList = ['life', 'lifeRegen', 'damage','fireRate', 'meleeArmor', 'rangeArmor', 'speed'];
        this.deck = [];

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
            this.activeDicotomyMenu();

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

        //sonidos
       this.music = this.sound.add('music',{volume: 0.05,loop:true});
       this.music.play();

       this.hitSound = this.sound.add('golpe',{volume: 0.5});
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
        this.totemPool = new Pool(this,20,'kirby')


        let plBullets = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Bullet(this, 0, 0, 'bulletPlayer', true, 0, 0, this.playerBulletsPool);
            aux.setDepth(10);
            plBullets.push(aux);
        }

        //rellenar pool de balas del player
        this.playerBulletsPool.addMultipleEntity(plBullets);

        let enBullets = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Bullet(this, 0, 0, 'bulletEnemy', true, 0, 0, this.enemiesBulletsPool);
            aux.setDepth(10);
            enBullets.push(aux);
        }
        this.enemiesBulletsPool.addMultipleEntity(enBullets);

        let enemysArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Enemy(this, 0, 0, ['','enemyMove2'], this.meleeEnemiesPool);
            aux.setDepth(10);
            enemysArr.push(aux);
        }

        this.meleeEnemiesPool.addMultipleEntity(enemysArr);

        let rangeArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new RangeEnemy(this, 0, 0, ['','enemyMove2'], this.rangeEnemiesPool);
            aux.setDepth(10);
            rangeArr.push(aux);
        }

        this.rangeEnemiesPool.addMultipleEntity(rangeArr);

        let dustArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new Dust(this, 0, 0, 'polvos', this.dustPool, (amount) => {
                //aux.setDepth(10);
                this.player.addDust(amount);
            });
            dustArr.push(aux);
        }

        this.dustPool.addMultipleEntity(dustArr);


        let totemArr = [];

        for (let i = 0; i < 20; i++) {
            let aux = new Totem(this, 0, 0, 'kirby', this.totemPool, () => {
                this.activeDicotomyMenu();
            });
            totemArr.push(aux);
        }

        this.totemPool.addMultipleEntity(totemArr);
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
            //enemy.scene.hitSound.play();
        });
        //colisiones entre las balas del jugador y los enemigos a rango
        this.physics.add.collider(this.playerBulletsPool.group, this.rangeEnemiesPool.group, function (proyectle, enemy) {
            let dmg1 = proyectle.damage;
            let dmg2 = enemy.health;
            enemy.Hit(dmg1);
            proyectle.Hit(dmg2, false);
            enemy.scene.player.addEureka()
            //enemy.scene.hitSound.play();
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
            //player.addDust(dust.amount);
        })

         //colisiones con el trigger de los totem
         this.physics.add.overlap(this.player, this.totemPool.group, function (player, totem) {
            totem.Hit();
            //player.addDust(dust.amount);
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

        this.anims.create({
            key: 'deathPlayer',
            frames: this.anims.generateFrameNumbers('deathPlayer', { start: 0, end: 9 }),
            frameRate: 10, // Velocidad de la animación
            repeat: 0    // Animación en bucle
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
        if(this.globalTime >= this.waveJson.NewWaves[this.currentWave + 1].waveStartTime ){
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
            
            //info de este spawn
            let spawnData =  this.waveJson.NewWaves[this.currentWave].spawnsData[i];  

            //posicion en la que vamos a spawnear
            let spawnPos = this.spawnPositions[i];

            this.spawnDataUpdate(spawnData,spawnPos,dt,false,false);
        }

        //SPAWN DEL TOTEM ENEMY

        //info del spawn del totem
        let totemData =  this.waveJson.NewWaves[this.currentWave].totemEnemy[0];
    
        //posicion en la que vamos a spawnear
        let spawnPos = this.spawnPositions[Phaser.Math.Between(0,this.spawnPositions.length-1)];
         
        this.spawnDataUpdate(totemData,spawnPos,dt,false,true);             
         
    }

    //masillas, falta ir actualizando los config de los enemies
    masillasLogic(dt) {

        //para cada uno de los spawns de las masillas
        for(let i = 0; i < this.waveJson.Masillas[0].spawnsData.length ;i++){
        
            //info de este spawn
            let spawnData = this.waveJson.Masillas[0].spawnsData[i];
            
            //posicion en la que vamos a spawnear
            let spawnPos = this.spawnPositions[spawnData.spawnIndex];
                
            this.spawnDataUpdate(spawnData,spawnPos,dt,true,false);             
        }
             
    };


    spawnDataUpdate(spawnData,spawnPos,dt,masillas,totem) {

        //actualizar el contador de tiempo
        spawnData.timer += dt;
    
        //si toca spawnear y quedan enemigos en este spawn point
        if(spawnData.timer >= spawnData.frecuency && (masillas ||spawnData.size > 0)) {
           
           
            //si es una masilla hay que cambiar el indice del spawn para el proximo
           if(masillas){
               spawnData.spawnIndex = (spawnData.spawnIndex + 1 ) % this.spawnPositions.length;
               
               //posicion en la que vamos a spawnear
               spawnPos = this.spawnPositions[spawnData.spawnIndex];
           }
    
           let configIndex = 0;

           if(totem){
                //esto tiene que estar ligado al data
                configIndex = 3;
           }



            //spawnear segun el tipo, solo cambia la pool y el config
            if(spawnData.type == "melee"){
                this.meleeEnemiesPool.spawn(spawnPos.x,spawnPos.y,spawnData.animKey,this.data.EnemyConfigs[configIndex]);
            }
            else if(spawnData.type == "range"){
                this.rangeEnemiesPool.spawn(spawnPos.x,spawnPos.y,spawnData.animKey,this.data.RangeConfigs[configIndex]);
            }
            



            //si no es masilla, reducimos el size
            if(!masillas){
               spawnData.size--;
            }
            //resetear el timer
            spawnData.timer = 0;
       }
    }
        
    

    //busca los spawnPoints mas cercanos
    sortSpawnPoints() {
        
        //array de posiciones final, lo reseteamos
        this.spawnPositions = [];

        //posicion del jugador
        let playerPos = new Phaser.Math.Vector2(this.player.x,this.player.y);

        //contador para recorrer los spawnPoint del array en el que estan todos
        let spawnIndex = 0;
           
        //recorremos todos los spawnPoints
        while(spawnIndex < this.spawnPoints.length){

            //si cumple la condicion y no estaba antes, añadirlo
            let point = new Phaser.Math.Vector2(this.spawnPoints[spawnIndex].x,this.spawnPoints[spawnIndex].y);
            let distance = playerPos.distance(point);

            //si está en el rango
            if(distance >= this.minSpawnRange && distance <= this.maxSpawnRange){

                //si la lista no está llena añadirlo
                if(this.spawnPositions.length < this.waveJson.NewWaves[this.currentWave].spawnsData.length){                  
                    this.spawnPositions.push(point);       
                }
                else{
                    /**Si la lista está llena, buscar el punto mas lejano del player, comparar si el que estamos buscando es mas cercano
                     * que ese, si lo es, lo intercambiamos
                     */

                    let k = 0;

                    //indice del mas lejano
                    let indexMax = 0;

                    //buscar el mas lejano
                    while(k < this.spawnPositions.length){
                             
                        if(playerPos.distance(this.spawnPositions[indexMax]) < playerPos.distance(this.spawnPositions[k])){
                            indexMax = k;
                        }
                        k++;
                    }

                    //si es mas cercano que el mas lejano,intercambiarlo
                    if(distance < playerPos.distance(this.spawnPositions[indexMax])){
                        this.spawnPositions[indexMax] = point;
                    }
                }

            }

            spawnIndex++;
        }   

    }

    /**
     * método que detiene el tiempo al llegar el eureka
     * @param {boolean} value 
     */
    isTimeToStop(value){
        this.stopEnemy = value ;
        
    }

    activeDicotomyMenu(){
        this.scene.sleep('UIScene');
        this.scene.launch('Menu');
        this.scene.setActive(false);
        // necesitamos rellenar la deck para que aparexcan cartas nuevas al cargar el menú
        this.dicotomyManager.deckFill(this.deck);
        console.log(this.deck);
        this.player.applyCard(this.deck[0]);
        this.music.pause();
    }

    playerDeath(){

    }
}