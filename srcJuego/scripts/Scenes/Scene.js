import Player from '../Objects/Player.js'
import RangeEnemy from '../Objects/RangeEnemy.js'
import Pool from '../Pool.js'
import Bullet from '../Objects/Bullet.js'
import Enemy from '../Objects/Enemy.js'
import InteractuableObjects from '../Objects/InteractuableObject.js'
import Dicotomías from '../Dicotomias.js'
import Card from '../UI_Objects/Card.js'
import Dust from '../Objects/Dust.js'
import Totem from '../Objects/Totem.js'
import Waves from '../Waves.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "level" })
    }
    //data transfer
    init() {

    }
    //load data
    preload() {

        this.load.on('complete', () => {
            this.scene.run('UIScene');
        });

        this.cameras.main.zoom = 2;
    }

    //instance
    create() {

        //leer los json, de data y oleadas
        this.data = this.game.cache.json.get('data');

        this.waveJson = this.game.cache.json.get('waves');

        // Cursor personalizado
        this.input.setDefaultCursor('url(srcJuego/img/crosshair.png) 16 16, pointer');

        //creacion del jugador
        this.player = new Player(this, 960, 540, ['idlePlayer', 'PlayerMove', 'deathPlayer'], this.data.PlayerConfig);


        this.cardMap = {
            life: 20,
            lifeRegen: 2,
            damage: 2,
            fireRate: 5,
            meleeArmor: 5,
            rangeArmor: 5,
            speed: 5
        }

        this.statKeyList = ['life', 'lifeRegen', 'damage', 'fireRate', 'meleeArmor', 'rangeArmor', 'speed'];
        this.deck = [];

        this.dicotomyManager = new Dicotomías(this.player, 50, 50, 50, 50, this.scene.get('UIScene'));
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

        this.pause = this.input.keyboard.addKey('P');
        this.esc = this.input.keyboard.addKey('ESC');
        this.cum = this.input.keyboard.addKey('Q');

        //entrar al menu de dicotomías, solo para testeo
        this.cum.on('down', event => {
            this.activeDicotomyMenu();

        });

        //entrar al menu de pausa
        this.pause.on('down', event => {
            this.activePauseMenu();

        });


        //salir de pantalla completa
        this.esc.on('up', event => {
            this.scale.stopFullscreen();
            document.getElementById("seccion-juego").className = "classSeccionJuego";
            document.getElementById("juego").className = "classJuego";
        })






        // Recogida del input de movimiento en un vector
        this._inputVector = new Phaser.Math.Vector2(0, 0);

        //booleano que detiene el movimiento de los enemigos
        this.stopEnemy = false;


        //sonidos
        this.music = this.sound.add('music', { volume: 0.05, loop: true });
        this.music.play();

        this.hitSound = this.sound.add('golpe', { volume: 0.5 });


        this.killedEnemies = 0;
        this.currentEnemies = 0;

        this.wavesProbe = new Waves(this,"");

        //precio de subir las dicótomías (ahora se mantiene)
        this.dicPrice = 20;
    }

    //game tick
    update(t, dt) {
        this.playerMove();

        //la cámara sigue al jugador
        this.cameras.main.startFollow(this.player);

        this.wavesProbe.update(dt);
    }

    /**inicializacion de la pools */
    setPools() {

        // creacion de pools
        this.playerBulletsPool = new Pool(this, 20);//cambiar los magics numbers por constantes
        this.enemiesBulletsPool = new Pool(this, 200);
        this.meleeEnemiesPool = new Pool(this, 50);
        this.rangeEnemiesPool = new Pool(this, 50);
        this.dustPool = new Pool(this, 100, 'polvos');
        this.totemPool = new Pool(this, 20, 'kirby')


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
            let aux = new Enemy(this, 0, 0, ['', 'enemyMove2'], this.meleeEnemiesPool);
            aux.setDepth(10);
            enemysArr.push(aux);
        }

        this.meleeEnemiesPool.addMultipleEntity(enemysArr);

        let rangeArr = [];

        for (let i = 0; i < 100; i++) {
            let aux = new RangeEnemy(this, 0, 0, ['', 'enemyMove2'], this.rangeEnemiesPool);
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
            let aux = new Totem(this, 0, 0, 'chest', this.totemPool, () => {
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
        this.physics.add.collider(this.playerBulletsPool.group, this.wallLayer, function (bullet, wall) {
            bullet.Hit(bullet.health);
        })
        this.physics.add.collider(this.enemiesBulletsPool.group, this.wallLayer, function (bullet, wall) {
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

    /**
     * método que detiene el tiempo al llegar el eureka
     * @param {boolean} value 
     */
    isTimeToStop(value) {
        this.stopEnemy = value;

    }

    activePauseMenu() {
        this.scene.sleep('UIScene');
        this.scene.launch('Pause');
        this.scene.setActive(false);
        this.music.pause();
    }

    activeDicotomyMenu() {
        this.scene.sleep('UIScene');
        this.scene.launch('Menu');

        this.scene.setActive(false);

        //necesitamos rellenar la deck para que aparexcan cartas nuevas al cargar el menú
        this.dicotomyManager.deckFill(this.deck); //rellena la deck con ncards con la dicotomía
        console.log(this.deck); // escribe la deck
        //this.player.applyCard(this.deck[0]);
        this.music.pause();
    }

    playerDeath() {
        this.scene.sleep('UIScene')
        this.scene.sleep('level')
        this.scene.launch('FinalScene',
        //Json que se pasa a la escena final para recabar datos
        {dicManager: this.dicotomyManager, 
            //Tiempo
            finalTime:{
                minutes: this.scene.get("UIScene").minuteCount.toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false,maximumFractionDigits:0 }),
                seconds: this.scene.get("UIScene").secondsCount.toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false,maximumFractionDigits:0 })
            }
        });
        this.music.stop();
    }
}