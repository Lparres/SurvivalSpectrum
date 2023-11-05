
export default class Bullet extends Phaser.GameObjects.Sprite
{
   
    //Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga

    /**
     * Consturctor bullet
     * @param {Scene} scene escena del objeto
     * @param {number} x posicion x
     * @param {number} y posicion y
     * @param {string} key clave de la imagen
     * @param {boolean} idParent true si el padre es el player, false si el 
     * padre es el enemigo, para que las balas de un mismo grup no colisionen entre si
     * @param {number} daño funciona como daño y vida de la bala(las balas pueden atravesar)
     * @param {number} velocity  velocidad del movimiento
    * */
    constructor(scene,x,y,key, idParent, daño, velocity)
    {
        super(scene,x,y,key);

        // Padre de la bala (para no dañar al jugador con sus propias balas, ni los enemigos se dañen entre ellos) , true o false
        this._idParent = idParent;
        // Es a la vez el daño y la vida de la bala
        this._damage = daño;
        //velocidad de movimiento de las balas
        this._velocity = velocity;

        //objeto destino que guarda la posicion 
        let destino = this._idParent ? this.scene.input.mousePointer : this.scene.player;
     
        //vector de la direccion del movimiento
        this._moveVector = new Phaser.Math.Vector2(destino.x - this.x ,destino.y - this.y).normalize();
        
        //settear escala
        this.setScale(0.05);
        
        //añadirlo a la escena
        this.scene.add.existing(this);

        //añadirle fisicas
        this.scene.physics.add.existing(this);
        //añadido al grupo de fisicas de bullets
        this.scene.bullets.add(this);
    }

    preUpdate(t,dt){
        this.Move();
    }


    //métodos
    Hit = function()
    {
        //console.log("colision bala");
        this.destroy();//esto creo que es mejor cambiarlo al preupdate
    }

    //movimiento por fisicas
    Move = function(){
        this.body.setVelocity(this._moveVector.x * this._velocity,this._moveVector.y * this._velocity);
    }

}

