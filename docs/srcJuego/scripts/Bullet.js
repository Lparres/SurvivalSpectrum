import Mob from './Mob.js'

export default class Bullet extends Mob
{
   
    //Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga

    /**
     * Consturctor bullet
     * @param {Scene} scene escena del objeto
     * @param {number} x posicion x
     * @param {number} y posicion y
     * @param {string} key clave de la imagen
     * @param {bool} idParent true si el padre es el player, false si el 
     * padre es el enemigo, para que las balas de un mismo grup no colisionen entre si
     * @param {number} damage funciona como daño y vida de la bala(las balas pueden atravesar)
     * @param {number} velocity  modulo velocidad del movimiento
    * */
    constructor(scene,x,y,key, idParent, damage, velocity,pool)
    {
        super(scene,x,y,key, 10, damage,velocity,pool);

        // Padre de la bala (para no dañar al jugador con sus propias balas, ni los enemigos se dañen entre ellos) , true o false
        this._idParent = idParent;

        this.range;

        //objeto destino que guarda la posicion 
        //let destino = this._idParent ? this.scene.input.mousePointer : this.scene.player;
        
        //settear escala
        this.setScale(0.05);
        

        //añadido al grupo de fisicas de bullets

        
    }

    preUpdate(t,dt){
        this.Move();
        this.range -= dt*this.body.velocity.length()/1000;
        if(this.range < 0){
            console.log("adios Mundo cruel");
            this.pool.release(this);
        }
    }


    /**
     * 
     * @param {number} damage 
     */
    Hit(damage, idParent)
    {
        console.log(this.idParent);
        if(this.idParent != idParent){
            this.damage = this.health;
            this.ReciveDamage(damage);//esto creo que es mejor cambiarlo al preupdate
            console.log("Damage: "+ damage);
        }
        //console.log("colision bala");
    }
    /**
    * @param {SettingObject} seting necesita: {idParent, damage, speed} 
    */
    setUp(seting){
        this.idParent = seting.idParent;
        this.health = seting.damage;
        this.damage = seting.damage;
        this.speed = seting.velocity;

        this.range = seting.range;

        let dirDest;
        if(this.idParent){
            dirDest = this.scene.input.mousePointer.position
            //this.SetDirection(this.scene.input.mousePointer.position);
            //this.scene.playerBullets.add(this);
        }
        else{
            dirDest = new Phaser.Math.Vector2(this.scene.player.x,this.scene.player.y);
            //this.scene.enemiesBullets.add(this);

        }
        this.SetDirection(new Phaser.Math.Vector2(dirDest.x - this.x ,dirDest.y - this.y));
    }

}

