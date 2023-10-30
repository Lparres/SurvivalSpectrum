export default class Player extends Phaser.GameObjects.Sprite
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *Scene es la escena a la que pertenecen los enemigos
    *x es la coordenada x del sprite
    *y es la coordenada y del sprite
    *life es la vida inicial del jugador
    *AtkCD es el CoolDown entre ataques
    *Velocity es la velocidad de movimiento
    *daño es el daño de cada ataque
    *range es el rango de los ataques del player
    *armor es la armadura del jugador
    *Rage es el cargador de rabia
    *eureka es el cargador de eureka
    */
    constructor(scene, x, y, life, damage, velocity, range, armor, rage)
    {
        //super(scene, x ,y, ) hay que cargar la imagen con su id

        this._life = life;
        //Genera un Cool Down aleatorio ente los dos (distinto para cada enemigo), los números están puestos a vole
        //Aún no se si van milisegundos o segundos
        this._atkCD = Phaser.Math.FloatBetween(0.5, 1);
        this._velocity = velocity;
        this._damage = damage;
        this._range = range;
        this._armor = armor;
        this._rage = 0;
        this._eureka = 0;
    }

    //métodos

    //método para moverte
    mover = function(){
        //vacío de momento
    }

    //método para disparar
    disparar = function(){
        //vacío de momento
    }

    // La dicotomía cambia el rango de ataque
    cambiaRange = function(damageOffset){
        //vacío de momento
    }

}