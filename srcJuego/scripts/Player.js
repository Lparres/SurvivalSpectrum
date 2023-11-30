import Pool from "./Pool.js";
import Mob from "./Mob.js";
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
        this._maxLife = playerConfig.life; //vida maxima
        this._velocity = playerConfig.velocity;
        this._damage = playerConfig.damage;
        this._range = playerConfig.range;
        this._meleeArmor = playerConfig.meleeArmor;
        this._rangeArmor = playerConfig.rangeArmor;
        this._dust = 0;

        //atack cooldown en milisegundos
        this._atkCD = playerConfig.Cooldown; 
        //para la recarga del ataque
        this._elapsedTime = 0;

        //dicotomias
        this._rage = 0;
        this._eureka = 0;

        //offset del origen de la bala
        this._bulletSpawnOffsetX = 15;
        this._bulletSpawnOffsetY = 100;

        //vector de movimiento
        this._moveVector = new Phaser.Math.Vector2(0,0);
        
        //escala y añadir a la escena
        this.setScale(0.3);
 
        //ajustar el tamaño del colider
        this.body.setSize(450,750,false);
        //ajustar el offset del colider
        this.body.setOffset(800,1050);
 
    }

    //métodos

    preUpdate(t,dt){
        //para que reproduzca la animación hay que llamar al update del padre
        super.preUpdate(t,dt);

        this.Move();
             
        this.Shoot(dt);
    }


    //método para disparar
    Shoot = function(dt) {
        //contador del tiempo
        this._elapsedTime += dt;


        if(this._elapsedTime >= this._atkCD){
            //new Bullet(this.scene,this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,'kirby',true,10,1000);    


            //cambiar magic numbers por las variables del player
            let BulletSeting ={
                idParent : true,
                damage : 10,
                velocity : 1000,
                range: this._range
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
    Hit = function(damage, damageType) {

        let damageReduction;
        if(damageType == 1) damageReduction = 100 / (100 + this._meleeArmor);
        else if (damageType == 2) damageReduction = 100 / (100 + this._rangeArmor);
        //this._currentLife -= damage * damageReduction;

        /*cuando herede de mob llamar al metodo ReciveDamage(damage*damageReduction) este ya se encarga de matar al jugador si es necesario
        en este caso se puede añadir un callback para detectar cuando muere el jugador y hacer las llamadas de fin de juego
        */
       this.ReciveDamage(damage*damageReduction);

       if(this.health < 0){
        console.log("Player Muerto");
       }
    }

    // La dicotomía cambia el rango de ataque
    cambiaRange = function(damageOffset){
        //vacío de momento
    }

    addDust = function(amount){
        this._dust += amount;
        console.log('polvos: ' + this._dust);
    }
}