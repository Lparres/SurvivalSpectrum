 export default class InteractuableObjects extends Phaser.GameObjects.Sprite
{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} key 
     * @param {number} objectConfig 
     * @param {Function} collisionFunction 
     */
    constructor(scene,x,y,key, pool, collisionFunction)
    {
        super(scene,x,y,key);
        this.collisionFunction = collisionFunction;
        this.pool = pool;
        this.setScale(0.02);

        //añadirlo a la escena
        this.scene.add.existing(this);

        //añadirle fisicas
        this.scene.physics.add.existing(this);
    }

    Hit()
    {
        this.collisionFunction(this.amount);
        this.pool.release(this);
    }

    setUp(objectConfig){
        this.amount = objectConfig.amount;
    }

}