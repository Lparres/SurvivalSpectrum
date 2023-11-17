import Pool from "./Pool";

/**@description Clase Base para los objetos dinámicos de la escena
 * @extends Phaser.GameObjects.Sprite
 */
export default class Mob extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} key 
     * @param {number} hp puntos de vida de la entidad
     * @param {number} damage danio de la entidad
     * @param {number} speed velocidad de movimiento de la entidad
     * @param {Pool} pool pool a la que pertenece el objeto
     */
    constructor(scene,x,y,key,hp,damage,speed, pool){
        super(scene,x,y,key);
        this.dir = dir;
        this.health = hp
        this.damage = damage;
        this.speed = speed;
        this.pool = pool;
    }


    /** @description Mueve el personaje y reproduce su animación de movimient se debe ajustar la dirección y la velicidad de forma externa*/
    Move(){
        //movimiento del objeto
        this.body.setVelocity(this.dir.x*this.speed,this.dir.y*this.speed);
        //animacion de movimiento
        if(this._moveVector.y == 0 && this._moveVector.x == 0){
            this.stop();//parar la animacion
        }
        else{
            this.play(key,true);//continuar la animacion
        }
    }

    /** @description La entidad recibe una cantidad de danio. Si esta la mata se "Destruye"
     * @param {number} dmg danio a recibir
    */
    ReciveDamage(dmg){
        this.hp -= dmg;
        if(this.hp <0){
            this.pool.release(this)
        }
    }

    /**Cambia la direccion y la normaliza
     * @param {Phaser.Math.Vector2D} direccion direccion a la que se quiere ajustar la velocidad */
    SetDirection(direccion){
        this.dir = direccion.normalize();
    }
//dejo este metodo vacio porque realmente cada hijo tiene un comportamiento especifico al ser golpeado
    OnHit(dmg){

    }
}