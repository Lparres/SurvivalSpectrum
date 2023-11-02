// clase de la que heredan los demás scripts de los enemigos
export default class Enemy extends Phaser.GameObjects.Sprite
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *AtkCD es el CoolDown entre ataques
    */

    /**
 * Consturctor del player
 * @param {Scene} scene escena a la que pertenecen los enemigos
 * @param {number} x coordenada x del sprite
 * @param {number} y coordenada y del sprite
 * @param {number} playerConfig Objeto que guarda la informacion del enemy{life, velocity, damage,minCooldown,maxCooldown}
 * */
    constructor(scene, x, y,key,enemyConfig)
    {
        //constructor del padre
        super(scene, x ,y,key); 

        //atributos del enemigo
        this._vida = enemyConfig.vida;
        this._damage = enemyConfig.damage;
        this._velocity = enemyConfig.velocity;

        //cooldowns de ataque
        this._minCD = enemyConfig.minCooldown;
        this._maxCD = enemyConfig.maxCooldown;
        
        //Genera un Cool Down aleatorio ente los dos (distinto para cada enemigo), los números están puestos a vole
        //Aún no se si van milisegundos o segundos
        this._atkCD = Phaser.Math.FloatBetween( this._minCD,this._maxCD);
    }
    
    // métodos

    //método para moverte
    mover = function(){
        //vacío de momento
    }

    //método para disparar
    Disparar = function(){
        //vacío de momento
    }
}