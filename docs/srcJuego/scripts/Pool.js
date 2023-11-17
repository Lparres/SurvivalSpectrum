/**
 * Pool de objetos que heredan de Phaser.Sprite
 */
export default class Pool {
    constructor(scene, size){
        this.group = scene.add.group();
        this.scene = scene;
        this.maxSize = size;
    }

    /**
	 * Método para añadir nuevos objetos a la pool.
	 * Nos servirá para crear una pool inicial si no lo hemos hecho en el constructor.
	 * Todos los elementos añadidos los activamos como disponibles para reutilizar
	 * @param {Array} entities - array de objetos que añadir a la pool
	 */
	addMultipleEntity(entities) {
		this._group.addMultiple(entities);
		entities.forEach(c => {
			this._group.killAndHide(c);
			c.body.checkCollision.none = true;
		});
	}

    spawn(x,y,animKey = 'none', settings){
        let entity = this.group.getFirtsDead();

        if(!entity){
            //cambiar a redimensionamiento
            entity = this.group.getFirstNth(1,true);
            this.group.remove(entity);
            this.group.add(entity);
        }else{
            entity.x = x;
			entity.y = y;
			entity.play(animationKey)
			entity.setActive(true);
			entity.setVisible(true); 
            //entity.setUp(settings)
			entity.body.checkCollision.none = false;
        }

        return entity;
    }
    release(entity){
        this.group.killAndHide(entity);
        entity.body.checkCollision.none = true;
    }

}