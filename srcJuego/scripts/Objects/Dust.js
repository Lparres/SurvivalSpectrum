import InteractuableObjects from '../Objects/InteractuableObject.js'

export default class Dust extends InteractuableObjects{



    constructor(scene,x,y,key, pool, collisionFunction)
    {
        super(scene,x,y,key,pool,collisionFunction);


        this.setScale(0.02);
    }

      //metodo virual
      Hit()
      {
          this.collisionFunction(this.amount);
          this.pool.release(this);
      }
  
      //metodo virtual
      setUp(objectConfig){
          this.amount = objectConfig.amount;
          this.setDepth(9);
      }
}