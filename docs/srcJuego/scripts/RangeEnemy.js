import Enemy from "./Enemy";

export default class RangeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *Me tengo que poner a revidar los ejemplos a parte de los apuntes, pero creo que la llamada al constructor de super es necesaria
    * range equivale al rango de este enemigo
    */
    constructor(scene,x,y, damage, velocity, range)
    {
        super(scene,x,y,vida,damage,velocity);
        this._range = range;
    }
}
