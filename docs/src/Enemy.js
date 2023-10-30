// clase de la que heredan los demás scripts de los enemigos
export default class Enemy extends Phaser.GameObjects.Sprite
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *Scene es la escena a la que pertenecen los enemigos
    *x es la coordenada x del sprite
    *y es la coordenada y del sprite
    *vida es la vida inicial del jugador
    *AtkCD es el CoolDown entre ataques
    *Velocity es la velocidad de los enemigos
    */
    constructor(scene, x, y, vida, damage, velocity)
    {
        //super(scene, x ,y, ) hay que cargar la imagen con su id

        this._vida = vida;
        //Genera un Cool Down aleatorio ente los dos (distinto para cada enemigo), los números están puestos a vole
        //Aún no se si van milisegundos o segundos
        this._atkCD = Phaser.Math.FloatBetween(0.5, 1);
        this._velocity = velocity;
    }
    
    // métodos

    //método para moverte
    mover = function(){
        //vacío de momento
    }
}