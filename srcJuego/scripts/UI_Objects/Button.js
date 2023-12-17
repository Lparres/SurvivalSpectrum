/**
 * clase boton generico que realiza la accion que se le indique al pulsar
 * al pasar el raton por encima se altera un poco el tamaño del sprite
 */
export default class Button extends Phaser.GameObjects.Sprite{
    /**
     * clase boton generico que realiza la accion que se le indique al pulsar
     * al pasar el raton por encima se altera un poco el tamaño del sprite
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {string} key clave para acceder al sprite del boton
     * @param {number} baseScale escala a la que poner el sprite designado
     * @param {funcion} func funcion llamada al pulsar el boton
     */
    constructor(scene, x, y, key,baseScale,func,hover = true){
        super(scene, x,y, key);

        this.setOrigin(0.5 , 0.5)
        this.setScale(baseScale,baseScale);
        this.setInteractive();
        
        this.scene.add.existing(this);


        this.on('pointerdown',function(){
            func();
        })
        this.on('pointerout',function(){
            if(hover)
                this.setScale(baseScale,baseScale);
        })
        this.on('pointerover',function(){
            if(hover)
                this.setScale(baseScale+0.03,baseScale+0.03);
        })
    }
}