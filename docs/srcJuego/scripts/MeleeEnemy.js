import Enemy from "./Enemy.js";

export default class MeleeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *Me tengo que poner a revidar los ejemplos a parte de los apuntes, pero creo que la llamada al constructor de super es necesaria
    * tickTime es el Cool Down entre golpes
    */
    constructor(scene, x, y, key, enemyConfig, tickTime)
    {
        super(scene, x, y, key, enemyConfig);
        this._tickTime = tickTime;
    }
}