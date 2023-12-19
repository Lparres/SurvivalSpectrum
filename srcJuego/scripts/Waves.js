export default class Waves extends Phaser.GameObjects.GameObject{


    constructor(scene,type){
        //constructor del super
        super(scene,type);

        //hacemos una copia del json orignal
        this.waveJson = structuredClone(this.scene.waveJson);
        
        //leemos la data
        this.data = structuredClone(this.scene.data);

        //leer variables del level
        this.meleeEnemiesPool = this.scene.scene.get("level").meleeEnemiesPool;

        this.rangeEnemiesPool = this.scene.scene.get("level").rangeEnemiesPool;

        this.player   = this.scene.scene.get("level").player;

        this.spawnPoints = this.scene.scene.get("level").spawnPoints;

        //la escena actual
        this.currentWave = 0;
        
        this.spawnPositions = [];

        //rangos para la distancia de spawn de los enemigos
        this.minSpawnRange = 400;
        this.maxSpawnRange = 750;

        //cada cuanto tiempo se realculan los spawn points
        this.sortSpawnPointsFrecuency = 4000;
        this.sortSpawnPointsTimer = 9999;

        //para calcular cuando sale la nueva oleada
        this.globalTime = 0;

        this.waveType = Phaser.Math.Between(0,(this.waveJson.Waves.length-1));


        //escalado por rondas
        //0,1 = 10%
        this.scaleMeleeLifeFactor = 0.07;
        this.scaleMeleeDamageFactor = 0.07;


        this.scaleRangeLifeFactor = 0.07;
        this.scaleRangeEnemyRangeDamageFactor = 0.07;


        this.scaleWaveNumberFactor = 0.2;

    }

    update(dt){

        this.oleadasLogic(dt);

        this.masillasLogic(dt);             
    }

    //oleadas
    oleadasLogic(dt) {

        this.globalTime = (this.scene.scene.get("UIScene").minuteCount * 60) + this.scene.scene.get("UIScene").secondsCount;

        //si ha llegado el tiempo de la siguiente oleada, cambiar de oleada,y actualizar spawnPoints
        if (this.globalTime >= this.nextWaveStartTime()) {
            this.currentWave = this.currentWave + 1;
            this.sortSpawnPoints();
            this.sortSpawnPointsTimer = 0;

            //actualizar la info de la UI

            this.waveType = Phaser.Math.Between(0,(this.waveJson.Waves.length-1));
            this.waveJson = structuredClone(this.scene.waveJson);
            this.data = structuredClone(this.scene.data);
            this.scaleDatas();
            this.scaleWaves();

            this.scene.scene.get("UIScene").updateWaveData();
        }


        //actualizar la posicion de los spawnPoints, cuando toque
        this.sortSpawnPointsTimer += dt;

        if (this.sortSpawnPointsTimer >= this.sortSpawnPointsFrecuency) {
            this.sortSpawnPoints();
            this.sortSpawnPointsTimer = 0;
        }


        //para cada uno de los spawns de la oleada actual
        for (let i = 0; i < this.waveJson.Waves[this.waveType].spawnsData.length; i++) {

            //info de este spawn
            let spawnData = this.waveJson.Waves[this.waveType].spawnsData[i];

            //posicion en la que vamos a spawnear
            let spawnPos = this.spawnPositions[i];
    

            this.spawnDataUpdate(spawnData, spawnPos, dt, false, false);
        }

        //SPAWN DEL TOTEM ENEMY

        //info del spawn del totem
        let totemData = this.waveJson.Waves[this.waveType].totemEnemy[0];

        //posicion en la que vamos a spawnear
        let spawnPos = this.spawnPositions[Phaser.Math.Between(0, this.spawnPositions.length - 1)];

        this.spawnDataUpdate(totemData, spawnPos, dt, false, true);

    }

    //masillas, falta ir actualizando los config de los enemies
    masillasLogic(dt) {

        //para cada uno de los spawns de las masillas
        for (let i = 0; i < this.waveJson.Masillas[0].spawnsData.length; i++) {

            //info de este spawn
            let spawnData = this.waveJson.Masillas[0].spawnsData[i];

            //posicion en la que vamos a spawnear
            let spawnPos = this.spawnPositions[spawnData.spawnIndex];

            this.spawnDataUpdate(spawnData, spawnPos, dt, true, false);
        }

    };


    //funcion generica para spawnear un enemigo, valida para oleadas, masillas y el enemigo con el totem
    spawnDataUpdate(spawnData, spawnPos, dt, masillas, totem) {

        //actualizar el contador de tiempo
        spawnData.timer += dt;

        //si toca spawnear y quedan enemigos en este spawn point
        if (spawnData.timer >= spawnData.frecuency && (masillas || spawnData.size > 0)) {

            //si es una masilla hay que cambiar el indice del spawn para el proximo
            if (masillas) {
                spawnData.spawnIndex = (spawnData.spawnIndex + 1) % this.spawnPositions.length;

                //posicion en la que vamos a spawnear
                spawnPos = this.spawnPositions[spawnData.spawnIndex];
            }

            let configIndex = 0;

            if (totem) {
                //esto tiene que estar ligado al data,solo hay un tipo de enemigo con el totem a true
                configIndex = 3;
            }


            //spawnear segun el tipo, solo cambia la pool y el config
            if (spawnData.type == "melee") {
                this.meleeEnemiesPool.spawn(spawnPos.x, spawnPos.y, spawnData.animKey, this.data.EnemyConfigs[configIndex]);
            }
            else if (spawnData.type == "range") {
                this.rangeEnemiesPool.spawn(spawnPos.x, spawnPos.y, spawnData.animKey, this.data.RangeConfigs[configIndex]);
            }


            //si no es masilla, reducimos el size
            if (!masillas) {
                spawnData.size--;
            }
            //resetear el timer
            spawnData.timer = 0;


            //si hemos spawneado, añadimos un enemigo al contador

            this.scene.currentEnemies++;
        }
    }


    //busca los spawnPoints mas cercanos
    sortSpawnPoints() {

        //array de posiciones final, lo reseteamos
        this.spawnPositions = [];

        //posicion del jugador
        let playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);

        //contador para recorrer los spawnPoint del array en el que estan todos
        let spawnIndex = 0;

        //recorremos todos los spawnPoints
        while (spawnIndex < this.spawnPoints.length) {

            //si cumple la condicion y no estaba antes, añadirlo
            let point = new Phaser.Math.Vector2(this.spawnPoints[spawnIndex].x, this.spawnPoints[spawnIndex].y);
            let distance = playerPos.distance(point);

            //si está en el rango
            if (distance >= this.minSpawnRange && distance <= this.maxSpawnRange) {

                //si la lista no está llena añadirlo
                if (this.spawnPositions.length < this.waveJson.Waves[this.waveType].spawnsData.length) {
                    this.spawnPositions.push(point);
                }
                else {
                    /**Si la lista está llena, buscar el punto mas lejano del player, comparar si el que estamos buscando es mas cercano
                     * que ese, si lo es, lo intercambiamos
                     */

                    let k = 0;

                    //indice del mas lejano
                    let indexMax = 0;

                    //buscar el mas lejano
                    while (k < this.spawnPositions.length) {

                        if (playerPos.distance(this.spawnPositions[indexMax]) < playerPos.distance(this.spawnPositions[k])) {
                            indexMax = k;
                        }
                        k++;
                    }

                    //si es mas cercano que el mas lejano,intercambiarlo
                    if (distance < playerPos.distance(this.spawnPositions[indexMax])) {
                        this.spawnPositions[indexMax] = point;
                    }
                }

            }

            spawnIndex++;
        }


      
    }


    nextWaveStartTime(){
        return 40 + (this.currentWave*50);
    }

    scaleDatas(){
        for(let i = 0; i < this.data.EnemyConfigs.length;i++){
            this.data.EnemyConfigs[i].life *= (1 +(this.scaleMeleeLifeFactor*this.currentWave)); 
            this.data.EnemyConfigs[i].damage *= (1 +(this.scaleMeleeDamageFactor*this.currentWave)); 
        }

        for(let i = 0;i < this.data.RangeConfigs.length;i++){
            this.data.RangeConfigs[i].settingMelee.life *= (1 +(this.scaleRangeLifeFactor*this.currentWave)); 
            this.data.RangeConfigs[i].rangeDamage *= (1 +(this.scaleRangeEnemyRangeDamageFactor*this.currentWave)); 
        }
    }


    scaleWaves(){
        for(let i = 0; i < this.waveJson.Waves.length;i++){
            for(let j = 0; j < this.waveJson.Waves[i].spawnsData.length;j++){
                this.waveJson.Waves[i].spawnsData[j].size *= (1 +(this.scaleWaveNumberFactor*this.currentWave));
            }
        }


    }
}