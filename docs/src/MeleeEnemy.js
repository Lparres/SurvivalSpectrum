import Enemy from "./Enemy";

export default class MeleeEnemy extends Enemy
{
    /* *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *Me tengo que poner a revidar los ejemplos a parte de los apuntes, pero creo que la llamada al constructor de super es necesaria
    * tickTime es el Cool Down entre golpes
    */
    constructor(scene,x,y, damage, velocity, tickTime)
    {
        super(scene,x,y,vida,damage,velocity);
        this._tickTime = tickTime;
    }
}