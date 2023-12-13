/**
 * Pool de objetos que heredan de Phaser.Sprite
 * 
 * Se podria pasar un objeto plantilla para rellenar la pool y que luego esta lo clonase tantas veces como fuera necesario
 */
export default class Pool {

    constructor(scene, size, key){
        this.group = scene.add.group();
        this.scene = scene;
        this.maxSize = size;
        this.key=key;

    }

    
    /**
     * Para cuando los objetos "mueran"
     * @param {Mob} entity entidad que muere 
     */
    release(entity){
        this.group.killAndHide(entity);
        entity.body.checkCollision.none = true;
    }


    /**
	 * Método para añadir nuevos objetos a la pool.
	 * Nos servirá para crear una pool inicial si no lo hemos hecho en el constructor.
	 * Todos los elementos añadidos los activamos como disponibles para reutilizar
	 * @param {Array} entities - array de objetos que añadir a la pool
	 */
	addMultipleEntity(entities) {
		this.group.addMultiple(entities);
		entities.forEach(c => {
            this.release(c);
		});
	}


    /**
     * 
     * @param {number} x pos x
     * @param {number} y pos y
     * @param {string} animKey clave de la animacion 
     * @param {SetingObject} settings ajustes
     * @returns 
     */
    spawn(x,y,animKey, settings){

        //pillar el primero muerto
        let entity = this.group.getFirstDead();

        //si no quedan objetos en la pool
        if(!entity){
            //cambiar a redimensionamiento
            entity = this.group.getFirstNth(1,true);
            this.group.remove(entity);
            this.group.add(entity);
            //if(this.key !== undefined){
            //    console.log("no queda");
            //}
        }
        else{
            //if(this.key !== undefined){
            //    console.log("else");
            //}
            //set up de la entidad
            entity.x = x;
			entity.y = y;

              

			if(animKey != ' '){
                entity.play(animKey)
            }
            //es posible que el set active quite configuraciones de profundidad
			entity.setActive(true);
			entity.setVisible(true); 
            //entity.setDepth(10);
            entity.setUp(settings);

            //activar colisiones
			entity.body.checkCollision.none = false;
        }



        return entity;
    }

}