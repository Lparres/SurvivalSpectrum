import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";

export default class RangeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, sin barra baja son las variables de la sobrecarga
    *Me tengo que poner a revidar los ejemplos a parte de los apuntes, pero creo que la llamada al constructor de super es necesaria
    * range equivale al rango de este enemigo
    */
    /**
 * Constructor 
 * @param {Scene} scene escena a la que pertenece
 * @param {number} x coordenada x del sprite
 * @param {number} y coordenada y del sprite
 * @param {string} key clave de la imagen 
 * @
 * */
    constructor(scene, x, y, key, enemyConfig, range)
    {
        super(scene, x, y, key, enemyConfig);
        this._range = range;
        this._bulletSpawnOffsetX = 15;
        this._bulletSpawnOffsetY = 100;
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        

        this.Shoot(dt);
    }

    //método para disparar

        
    Shoot = function(dt) {

        //contador del tiempo
        this._elapsedTime += dt;
        


        if(this._elapsedTime >= this._atkCD){
            new Bullet(this.scene,this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,'kirby',false,10,500);            
            this._elapsedTime = 0;
        }
    }
}
