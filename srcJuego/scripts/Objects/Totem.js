import InteractuableObjects from '../Objects/InteractuableObject.js'

export default class Totem extends InteractuableObjects{

    constructor(scene,x,y,key, pool, collisionFunction)
    {
        super(scene,x,y,key,pool,collisionFunction);
        this.setScale(0.10);
    }
  
      setUp(){
          this.setDepth(10);
      }
}