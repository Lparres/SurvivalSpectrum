import Enemy from "./Enemy.js";

export default class MeleeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    */
    constructor(scene, x, y, key, enemyConfig)
    {
        super(scene, x, y, key, enemyConfig);

    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
    }

    
}