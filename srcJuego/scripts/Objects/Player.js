import Pool from "../Pool.js";
import Mob from "./Mob.js";
import Dicotomías from '../Dicotomias.js'
export default class Player extends Mob
{
    /*
    *Las variable con barra baja son las de la clase, sin barra baja son las variables de la sobrecarga
    *life es la vida inicial del jugador
    *AtkCD es el CoolDown entre ataques
    *Velocity es la velocidad de movimiento
    *daño es el daño de cada ataque
    *range es el rango de los ataques del player
    *armor es la armadura del jugador
    *Rage es el cargador de rabia
    *eureka es el cargador de eureka
    */

//Propuesta, Meter en un objeto los bloques de estadisticas. (LUIS.C)
/**
 * Consturctor del player
 * @param {Phaser.Scene} scene escena a que pertenece
 * @param {number} x posicion x
 * @param {number} y posicion y
 * @param {string} key clave de la imagen
 * @param {number} playerConfig Objeto que guarda la informacion del player{life, velocity, damage,range,armor,minCooldown,maxCooldown}
 * */
//life, damage, velocity, range, armor, rage
    constructor(scene,x, y, key, playerConfig)
    {
        //llamada al constructor del super
        super(scene,x,y,key, playerConfig.life,playerConfig.damage,playerConfig.velocity, null) // hay que cargar la imagen con su id

        this.dir = new Phaser.Math.Vector2(0,0);

        //atributos del player
        this.maxLife = playerConfig.life; //vida maxima
        this.baseDamage = playerConfig.damage;
        this._meleeArmor = playerConfig.meleeArmor;
        this._rangeArmor = playerConfig.rangeArmor;
        this.baseRange = playerConfig.range;
        this.lifeReg = playerConfig.lifeRegen;
        
        this.bulletSpeed = playerConfig.bulletSpeed;


        //inicializar los polvos con los que empezamos
        this.dust = playerConfig.initialDust;
        
        
        //atack cooldown en milisegundos
        this._atkCD = playerConfig.shootCooldown; 
        //para la recarga del ataque
        this._timerAtackCooldown = 0;
        
        //cooldown del sonido de recibir daño
        this.reciveDamageSoundCooldown = playerConfig.reciveDamageSoundCooldown;

        //timer para el sonido de recibir daño
        this.reciveDamageSoundTimer = 0;


        //dicotomias
        this.dicUp = 10;
        this.rage = 0;
        this._eureka = 0;
        this.rageMax = 0;
        this.eurekaMax = 0;
        this.rageMode = false;
        this.eurekaMode = false;
        this.rageDamageMultiply = 1;
        this.lifeSteal = 10;
        this.dicTotalTime = 10000; // variable dentro del timer a modificar
        this.dicTime = 0;
        

        
        this.range = this.baseRange;
        this.damage = this.baseDamage;
        
        //offset del origen de la bala
        this._bulletSpawnOffsetX = 0;
        this._bulletSpawnOffsetY = 50;

        //vector de movimiento
        this._moveVector = new Phaser.Math.Vector2(0,0);

        //Evento de la regeneracion de vida
        this.regEvent = this.scene.time.addEvent( {
            args: [this.lifeReg],
            delay: 1000, 
            callback: this.lifeRegen,
            callbackScope: this,
            loop: true
        });

        
 
        //ajustar el tamaño del colider
        this.body.setSize(45,70,false);
        //ajustar el offset del colider
        this.body.setOffset(82,106);
        
        //margen para flipear el sprite
        this.flipMargin = 30;

        //sonido del hit
        this.playerHitSound = scene.sound.add('golpePlayer',{volume: 0.5});
    }

    //métodos

    preUpdate(t,dt){
        //para que reproduzca la animación hay que llamar al update del padre
        super.preUpdate(t,dt);

        this.Move();
             
        this.Shoot(dt);

        this.changeDicMode(dt);


        //flipeo del jugador segun la posicicon del raton
        //cambiar el magic number por el ancho de la pantalla
        this.flipX = this.scene.input.mousePointer.position.x <= (1920/2) - this.flipMargin ? true 
                    :this.scene.input.mousePointer.position.x >= (1920/2) + this.flipMargin ? false : this.flipX;

        
        //update del timer del sonido hit
        if(this.reciveDamageSoundTimer > 0){
            this.reciveDamageSoundTimer -= dt;
        }
                
    }
    
    //método para disparar
    Shoot(dt) {
        //contador del tiempo
        this._timerAtackCooldown += dt;
        //si toca disparar
        if(this._timerAtackCooldown >= this._atkCD){
               
            //cambiar de sitio, data de la bala
            let BulletSeting ={
                idParent : true,
                damage : this.damage,
                velocity : this.bulletSpeed,
                range: this.range
            }
            //spawnear la bala
            this.scene.playerBulletsPool.spawn(this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,' ',BulletSeting);
            //reset del tiempo
            this._timerAtackCooldown = 0;
        }
    }
    /**
     * 
     * @param {number} damage 
     * @param {number} damageType 1: melee 2: range
     */
    Hit(damage, damageType) {

        //sonido de recibir daño
        if(this.reciveDamageSoundTimer <= 0){
            this.playerHitSound.play();
            this.reciveDamageSoundTimer = this.reciveDamageSoundCooldown;
        }

        //determinar la reduccion de daño
        let damageReduction;
        if(damageType == 1) damageReduction = 100 / (100 + this._meleeArmor);
        else if (damageType == 2) damageReduction = 100 / (100 + this._rangeArmor);

       //recibir el daño(metodo de mob)
       this.ReciveDamage(damage*damageReduction);

       if(this.health < 0){
            //animacion de muerte
            this.play(this.key[2],true);

            //llamar a la escena

            this.scene.playerDeath();
       }
    }

    lifeRegen(amount){
        //sumar vida
        this.health += amount;
        //limitar la vida a la vida maxima
        if(this.health> this.maxLife){
            this.health = this.maxLife;
        }
        //console.log(amount + " curado")
    }

    // La dicotomía cambia el rango de ataque
    cambiaRange(damageOffset){
        //vacío de momento
    }

    addDust(amount){
        this.dust += amount;
        //console.log('polvos: ' + this.dust);
    }

    changeDicMode(dt){

        //si estamos en modo rabia o eureka, actualizamos el timer
        if((this.rageMode || this.eurekaMode) && this.dicTime <= this.dicTotalTime){
            this.dicTime += dt;
        }
        else{  

            this.dicTime = 0;
            
            //resetar las estadisticas a como estaban antes
            if(this.rageMode){

                this.rageMode = false;

                this.damage /= 2;
                this._meleeArmor *= 2;
                this._rangeArmor *=2;
                this.speed /= 3;

                //Sconsole.log(this.damage + " " + this._meleeArmor + " " + this._rangeArmor + " ");
            }
            else if(this.eurekaMode){//despausar a los enemigos

                this.eurekaMode = false;
                this.scene.isTimeToStop(false);
            }
        }
    }

    addRage(){

        //si no estamos en rabia ni en eureca
        if(!this.rageMode && !this.eurekaMode){

            //sumar rabia
            this.rage += this.dicUp;
            //console.log('dickUp' + this.dicUp);
            //console.log('rage: ' + this.rage);

            
           //entrar en rabia
           if(this.rage >= this.rageMax){

                this.rageMode = true;
                console.log(this.rageMode);     
                //reducir eureca
                this._eureka = this._eureka - (this._eureka * 20/100);

                //cambiar estadisticas
                this.rage = 0;
                this.damage *= 2;
                this._meleeArmor /= 2;
                this._rangeArmor /=2;
                this.speed *= 3;
               
                //console.log(this.damage + " " + this._meleeArmor + " " + this._rangeArmor + " ");
           }
        } 
    }

    addEureka(){

        //si no estamos en rabia ni en eureca
        if(!this.eurekaMode && !this.rageMode){

            this._eureka += this.dicUp;
        
            // console.log('eureka: ' + this._eureka);
        

            if(this._eureka >= this.eurekaMax){
                // console.log('eureka mode');
                this.eurekaMode = true;

                this.rage = this.rage - (this.rage * 20/100);
                this._eureka = 0;

                //this.dicTotalTime = this.eurekaTime;, this.eurekaTime no  existe

                this.scene.isTimeToStop(true);
            }
        }
        else if(!this.eurekaMode && this.rageMode){//si estamos en rabia sumar vida
            this.lifeRegen(this.lifeSteal);
        }
    }

    applyCard(key){
        switch(key){
            case 'life':
                this.life += this.scene.cardList.life;
                break;
            case 'lifeRegen':
                this.lifeSteal += this.scene.cardList.lifeRegen
                break;
            case 'damage':
                this.damage += this.scene.cardList.fireRate;
                break;

        }
    }
}
