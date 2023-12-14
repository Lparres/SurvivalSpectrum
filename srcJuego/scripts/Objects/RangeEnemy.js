import Enemy from "./Enemy.js";

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
    constructor(scene, x, y, key, pool)
    {
        super(scene, x, y, key, pool);

        this._range;
        this._rangeDamage = 0;
        this._rangeAttackCD = 0;
        this._bulletSpeed = 0;

        this._CDRangeTimer = 0;

        this._bulletSpawnOffsetX = 0;
        this._bulletSpawnOffsetY = 50;

    }

    preUpdate(t,dt){
        //para la animacion
        super.preUpdate(t,dt);

        if(!this.scene.stopEnemy){      
            this.UpdateRangeCooldown(dt);
            this.Shoot();
        }
    }


    UpdateRangeCooldown(dt){
        if (this._CDRangeTimer > 0){
            this._CDRangeTimer -= dt;
        }
    }

    
    
    //método para disparar
    Shoot() {

        if(this._CDRangeTimer <= 0){

            let BulletSeting ={
                idParent : false,
                damage : this._rangeDamage,
                range: this._range,
                velocity : this._bulletSpeed
            }

            this.scene.enemiesBulletsPool.spawn(this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,' ',BulletSeting);            
            this._CDRangeTimer = this._rangeAttackCD;
        }
    }

    setUp(settingRange,animKey){

        this.health = settingRange.settingMelee.life;
        this.damage = settingRange.settingMelee.damage;
        this.speed = settingRange.settingMelee.velocity;
        this._meleeAttackCD = settingRange.settingMelee.meleeAttackCD;
        this._CDMeleeTimer = 0;

        this._range = settingRange.range;
        this._rangeDamage = settingRange.rangeDamage;
        this._rangeAttackCD = settingRange.rangeAttackCD;
        this._bulletSpeed = settingRange.bulletSpeed;

        let dirDest = new Phaser.Math.Vector2(this.scene.player.x,this.scene.player.y);
        this.SetDirection(new Phaser.Math.Vector2(dirDest.x - this.x ,dirDest.y - this.y));

        //para la animacion de movimiento
        this.key[0] = '';
        this.key[1] = animKey;
    }
}
