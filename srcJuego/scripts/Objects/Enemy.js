import Mob  from './Mob.js'
// clase de la que heredan los demás scripts de los enemigos
export default class Enemy extends Mob
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *AtkCD es el CoolDown entre ataques
    */

    /**
 * Constructor del enemigo
 * @param {Scene} scene escena a la que pertenecen los enemigos
 * @param {number} x coordenada x del sprite
 * @param {number} y coordenada y del sprite
 * @param {string} key clave de la imagen 
 * @param {number} enemyConfig Objeto que guarda la informacion del enemy{life, velocity, damage,minCooldown,maxCooldown}
 * */
    constructor(scene, x, y, key, pool)
    {
        //constructor del padre
        super(scene, x ,y, key,1,1,1,pool);

        this._meleeAttackCD = 0;
        this._CDMeleeTimer = 0;

        this._moveVector = new Phaser.Math.Vector2(0,0);

        //asignar escala
        //this.setScale(0.3);
        //añadir a la escena
        this.scene.add.existing(this);

        //cambiar magic number por cte

        //ajustar el tamaño del colider
        this.body.setSize(45,70,false);
        //ajustar el offset del colider
        this.body.setOffset(82,106);

        //margen para flipear el sprite
        this.flipMargin = 30;

    }

    preUpdate(t,dt){
        //para la animación
        super.preUpdate(t,dt);

        let dirDest = new Phaser.Math.Vector2(this.scene.player.x,this.scene.player.y);
        this.SetDirection(new Phaser.Math.Vector2(dirDest.x - this.x ,dirDest.y - this.y));
        
        //flipear en relacion al jugador
        this.flipX = this.scene.player.x <= this.x - this.flipMargin ? true 
                    :this.scene.player.x >= this.x + this.flipMargin ? false : this.flipX;

        this.Move();                    
        this.UpdateMeleeCooldown(dt);

    }

    
    // métodos

    //método para moverte
    //Move = function(){
    //   
    //    //calcular el vector de direccion del movimient
    //    this._moveVector.x = this.scene.player.x- this.x;
    //    this._moveVector.y = this.scene.player.y- this.y;
    //    //normalizar el vector
    //    this._moveVector.normalize();   
    //    
    //    //movimiento por fisicas
    //    this.body.setVelocity(this._moveVector.x*this._velocity,this._moveVector.y*this._velocity);
//
    //    //animacion de movimiento
    //    this.play('enemyMove', true);
    //}

    

    Hit(damage){
        this.ReciveDamage(damage);
        if(this.health < 0){
            let dustConfig ={
                amount:50,
            }
            
            this.scene.dustPool.spawn(this.x,this.y, ' ', dustConfig);
        }
    }

    UpdateMeleeCooldown(dt){
        if (this._CDMeleeTimer > 0){
            this._CDMeleeTimer -= dt;
        }
    }
    /**
    * @param {SettingObject} seting necesita: {idParent, damage, speed}
    */
    setUp(seting){
        this.health = seting.life;
        this.damage = seting.damage;
        this.speed = seting.velocity;
        this._meleeAttackCD = seting.meleeAttackCD;
        this._CDMeleeTimer = 0;

        let dirDest = new Phaser.Math.Vector2(this.scene.player.x,this.scene.player.y);
        this.SetDirection(new Phaser.Math.Vector2(dirDest.x - this.x ,dirDest.y - this.y));
        //console.log(this.dir);
    }

    /*ReciveDamage(dmg){
        super.ReciveDamage(dmg);
        if(this.health <0){
            this.scene.dustPool.spawn(500,400,'polvos',dustConfig);
        }
    }*/ // Cuando los enemigos mueran deben spawnear los polvos (está rompido en este momento)

}