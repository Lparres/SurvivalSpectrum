
export default class Bullet extends Phaser.GameObjects.Sprite
{

    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *idParent es el id del padre, enemigo o player, no se hacen daño ni entre enemigos ni el player a sí mismo
    *trataremos idParent como un booleano, true si el padre es el player, false si el padre es el enemigo
    *daño hace las veces de daño y vida dentro de la baja
    */
    constructor(scene,x,y,key,idParent, daño,velocity)
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
        this.scene.physics.add.existing(this);

        this.scene.bullets.add(this);
    }

    preUpdate(t,dt){
        this.Move();
    }


    //métodos
    Hit = function()
    {

        console.log("Hola Mundo Choque");
        this.destroy();
    }

    Move = function(){

        this.x += this._moveVector.x * this._velocity;
        this.y += this._moveVector.y * this._velocity;
    }

}

