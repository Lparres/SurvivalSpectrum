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


    //esta clase en realidad es para los polvos solo no? no deberiamos hacer una clase general y otra que herede?
    constructor(scene,x,y,key, pool, collisionFunction)
    {
        super(scene,x,y,key);
        this.collisionFunction = collisionFunction;
        this.pool = pool;

        //añadirlo a la escena
        this.scene.add.existing(this);
        //añadirle fisicas
        this.scene.physics.add.existing(this);
    }

    /**@virtual */
    Hit(){
        this.collisionFunction();
        this.pool.release(this);
    }

    /**@virtual */
    setUp(objectConfig){
    }

}