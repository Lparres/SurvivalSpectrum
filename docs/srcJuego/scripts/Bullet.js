
export default class Bullet
{

    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    *idParent es el id del padre, enemigo o player, no se hacen daño ni entre enemigos ni el player a sí mismo
    *trataremos idParent como un booleano, true si el padre es el player, false si el padre es el enemigo
    *daño hace las veces de daño y vida dentro de la baja
    */
    constructor(idParent, daño)
    {
        // Padre de la bala (para no dañar al jugador con sus propias balas, ni los enemigos se dañen entre ellos) , true o false
        this._idParent = idParent;
        // Es a la vez el daño y la vida de la bala
        this._daño = daño;
    }
    //métodos
    Hit = function()
    {
        //por ahora vacia
    }
}

