import Bullet from "./Bullet.js";
export default class Player extends Phaser.GameObjects.Sprite
{
    /*
    *Las variable con barra baja son las de la clase, sin barra baja son las variables de la sobrecarga
    *life es la vida inicial del jugador
    *AtkCD es el CoolDown entre ataques
    *Velocity es la velocidad de movimiento
    *daño es el daño de cada ataque
    *range es el rango de los ataques del player
    *armor es la armadura del jugador
    *Rage es el cargador de rabia
    *eureka es el cargador de eureka
    */

//Propuesta, Meter en un objeto los bloques de estadisticas. (LUIS.C)
/**
 * Consturctor del player
 * @param {Scene} scene escena a que pertenece
 * @param {number} x posicion x
 * @param {number} y posicion y
 * @param {string} key clave de la imagen
 * @param {number} playerConfig Objeto que guarda la informacion del player{life, velocity, damage,range,armor,minCooldown,maxCooldown}
 * */
//life, damage, velocity, range, armor, rage
    constructor(scene,x, y, key, playerConfig)
    {
        //llamada al constructor del super
        super(scene, x ,y, key ) // hay que cargar la imagen con su id

        //atributos del player
        this._life = playerConfig.life;
        this._velocity = playerConfig.velocity;
        this._damage = playerConfig.damage;
        this._range = playerConfig.range;
        this._armor = playerConfig.armor;

        //atack cooldown en milisegundos
        this._atkCD = playerConfig.Cooldown; 
        //para la recarga del ataque
        this._elapsedTime = 0;

        //dicotomias
        this._rage = 0;
        this._eureka = 0;

        //offset del origen de la bala
        this._bulletSpawnOffsetX = 15;
        this._bulletSpawnOffsetY = 100;

        //vector de movimiento
        this._moveVector = new Phaser.Math.Vector2(0,0);
        
        //escala y añadir a la escena
        this.setScale(0.3);
        this.scene.add.existing(this);

         //añadir a las fisicas
         this.scene.physics.add.existing(this);
 
        //ajustar el tamaño del colider
         this.body.setSize(450,750,false);
         //ajustar el offset del colider
         this.body.setOffset(800,1050);
 
    }

    //métodos

    preUpdate(t,dt){
        //para que reproduzca la animación hay que llamar al update del padre
        super.preUpdate(t,dt);

        this.Move();
             
        this.Shoot(dt);
    }

    // Método para setear el vector de movimiento
    setMoveVector = function(inputVector){
        this._moveVector = inputVector.normalize();
    }

    //método para moverte
    Move = function(){

        //movimiento por fisicas
        this.body.setVelocity(this._moveVector.x*this._velocity,this._moveVector.y*this._velocity);

        //asignar la animacion correspondiente
        if(this._moveVector.y == 0 && this._moveVector.x == 0){
            this.stop();//parar la animacion
        }
        else{
            this.play('PlayerMove',true);//continuar la animacion
        }
    }

    //método para disparar
    Shoot = function(dt) {
        //contador del tiempo
        this._elapsedTime += dt;

        if(this._elapsedTime >= this._atkCD){
            new Bullet(this.scene,this.x + this._bulletSpawnOffsetX,this.y+this._bulletSpawnOffsetY,'kirby',true,10,500);            
            this._elapsedTime = 0;
        }
    }

    // La dicotomía cambia el rango de ataque
    cambiaRange = function(damageOffset){
        //vacío de momento
    }

}