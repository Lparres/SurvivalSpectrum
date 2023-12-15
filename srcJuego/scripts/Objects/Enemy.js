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

        //añadir a la escena
        this.scene.add.existing(this);

        //cambiar magic number por cte

        //ajustar el tamaño del colider
        this.body.setSize(45,70,false);
        //ajustar el offset del colider
        this.body.setOffset(82,106);

        //margen para flipear el sprite
        this.flipMargin = 30;

        this.hitTween = null;

        this.dustSpawnOffsetX = 0;
        this.dustSpawnOffsetY = 50;

        this.totemSpawnOffsetX = 0;
        this.totemSpawnOffsetY = 50;

    }

    preUpdate(t,dt){

        //si no estamos parados, comportamiento normal
        if(!this.scene.stopEnemy){

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
        else{
            //si estamos parados, setteamos la velocidad a 0
            this.body.setVelocity(0,0);
        }

    }

    

    Hit(damage){

        //animacion de golpeo
        this.hitTween = this.scene.tweens.add({
            targets:[this],
            ease:'Cubic.easeOut',
            duration:30,
            alpha: 0.2,
            repeat: 2,
            yoyo:true,
            paused:true
        });
        this.hitTween.play();

        //procesado del daño
        this.ReciveDamage(damage);
        this.scene.hitSound.play();

        
        if(this.health < 0){
            //cantidad del polvo
            let dustConfig ={
                amount:50,
            }
            
            //spawear un polvo
            this.scene.dustPool.spawn(this.x + this.dustSpawnOffsetX,this.y + this.dustSpawnOffsetY, ' ', dustConfig);

            //spawnear un totem
            if(this.totem){
                this.scene.totemPool.spawn(this.x + this.totemSpawnOffsetX,this.y+ this.totemSpawnOffsetY,' ');
            }
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
    setUp(seting,animKey){

        this.health = seting.life;
        this.damage = seting.damage;
        this.speed = seting.velocity;
        this._meleeAttackCD = seting.meleeAttackCD;
        this._CDMeleeTimer = 0;

        let dirDest = new Phaser.Math.Vector2(this.scene.player.x,this.scene.player.y);
        this.SetDirection(new Phaser.Math.Vector2(dirDest.x - this.x ,dirDest.y - this.y))


        //para la animacion de movimiento
        this.key[0] = '';
        this.key[1] = animKey;
    

        //variable para saber si este enemigo suelta el totem o no
        this.totem = seting.totem != undefined;
    }



}