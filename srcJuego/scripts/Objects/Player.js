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
        this.dust = 100;
        this.baseRange = playerConfig.range;
        
        
        //atack cooldown en milisegundos
        this._atkCD = playerConfig.Cooldown; 
        //para la recarga del ataque
        this._elapsedTime = 0;
        
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
        
        this.bulletSpeed = playerConfig.bulletSpeed;
        
        this.range = this.baseRange;
        this.damage = this.baseDamage;
        
        //offset del origen de la bala
        this._bulletSpawnOffsetX = 15;
        this._bulletSpawnOffsetY = 50;

        //vector de movimiento
        this._moveVector = new Phaser.Math.Vector2(0,0);
        
 
        //ajustar el tamaño del colider
        this.body.setSize(45,70,false);
        //ajustar el offset del colider
        this.body.setOffset(82,106);
        
        //margen para flipear el sprite
        this.flipMargin = 30;

        this.playerHitSound = scene.sound.add('golpePlayer',{volume: 0.5});
    }

    //métodos

    preUpdate(t,dt){
        //para que reproduzca la animación hay que llamar al update del padre
        super.preUpdate(t,dt);

        this.Move();
             
        this.Shoot(dt);

        //flipeo del jugador segun la posicicon del raton
        //cambiar el magic number por el ancho de la pantalla
        this.flipX = this.scene.input.mousePointer.position.x <= (1920/2) - this.flipMargin ? true 
                    :this.scene.input.mousePointer.position.x >= (1920/2) + this.flipMargin ? false : this.flipX;

        
        this.changeDicMode(dt);
    }
    
    //método para disparar
    Shoot(dt) {
        //contador del tiempo
        this._elapsedTime += dt;
        if(this._elapsedTime >= this._atkCD){
               
            //cambiar de sitio
            let BulletSeting ={
                idParent : true,
                damage : this.damage,
                velocity : this.bulletSpeed,
                range: this.range
            }

        

            this.scene.playerBulletsPool.spawn(this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,' ',BulletSeting);

            this._elapsedTime = 0;
        }
    }
    /**
     * 
     * @param {number} damage 
     * @param {number} damageType 1: melee 2: range
     */
    Hit(damage, damageType) {
        this.playerHitSound.play();
        let damageReduction;
        if(damageType == 1) damageReduction = 100 / (100 + this._meleeArmor);
        else if (damageType == 2) damageReduction = 100 / (100 + this._rangeArmor);
        //this._currentLife -= damage * damageReduction;

        /*cuando herede de mob llamar al metodo ReciveDamage(damage*damageReduction) este ya se encarga de matar al jugador si es necesario
        en este caso se puede añadir un callback para detectar cuando muere el jugador y hacer las llamadas de fin de juego
        */
       this.ReciveDamage(damage*damageReduction);

       if(this.health < 0){
            //console.log("Player Muerto");
       }
    }

    lifeRegen(amount){
        this.health += amount;
        if(this.health> this.maxLife){
            this.health = this.maxLife;
        }
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
        if((this.rageMode || this.eurekaMode) && this.dicTime <= this.dicTotalTime){
            this.dicTime += dt;
        }
        else{  
            this.dicTime=0;
            if(this.rageMode){
                this.damage /= 2;
                this._meleeArmor *= 2;
                this._rangeArmor *=2;
                this.speed /= 3;
                this.rageMode = false;
                //Sconsole.log(this.damage + " " + this._meleeArmor + " " + this._rangeArmor + " ");
                }
                else if(this.eurekaMode){
                    this.eurekaMode=false;
                    this.scene.isTimeToStop(false);
                }
        }
    }

    addRage(){
        if(!this.rageMode && !this.eurekaMode && !this.rageMode){
            this.rage += this.dicUp;
            //console.log('dickUp' + this.dicUp);
            console.log('rage: ' + this.rage);
           if(this.rage >= this.rageMax){
               //console.log('rage mode');
               this.rageMode = true;
               this._eureka = this._eureka - (this._eureka * 20/100);
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
        if(!this.eurekaMode && !this.rageMode){
            this._eureka += this.dicUp;
        
       // console.log('eureka: ' + this._eureka);
        
        if(this._eureka >= this.eurekaMax){
           // console.log('eureka mode');
            this.eurekaMode = true;
            this.rage = this.rage - (this.rage * 20/100);
            this._eureka = 0;
            this.scene.isTimeToStop(true);
        }
        }
        else if(!this.eurekaMode && this.rageMode){
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
