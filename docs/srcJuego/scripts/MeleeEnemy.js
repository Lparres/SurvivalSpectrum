import Enemy from "./Enemy.js";

export default class MeleeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    * tickTime es el Cool Down entre golpes
    */
    constructor(scene, x, y, key, enemyConfig, tickTime)
    {
        super(scene, x, y, key, enemyConfig);
        this._tickTime = tickTime;
    }
}