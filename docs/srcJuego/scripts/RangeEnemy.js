import Enemy from "./Enemy";

export default class RangeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, sin barra baja son las variables de la sobrecarga
    *Me tengo que poner a revidar los ejemplos a parte de los apuntes, pero creo que la llamada al constructor de super es necesaria
    * range equivale al rango de este enemigo
    */
    constructor(scene, x, y, key, enemyConfig, range)
    {
        super(scene, x, y, key, enemyConfig);
        this._range = range;
    }
}
