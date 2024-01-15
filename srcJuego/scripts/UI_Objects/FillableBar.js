export default class Bar extends Phaser.GameObjects.Container{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {number} maxValue
     * @param {Object} spritesConfig 
     * @param {Object} sizeConfig
     * @param {boolean} right determina si la barra es izquierda a derecha o derecha a izquierda
     */
    constructor(scene,x,y,maxValue,spritesConfig,sizeConfig,right = true){
        const marginHeith = 0;
        const marginPixels = 10;
        super(scene,x,y)

        this.value = 0;
        this.maxValue = maxValue;
        this.barWidth = sizeConfig.width;

        this.dir = right? 0 : 1;
        this.background = scene.add.nineslice(0, 0, 'ui', spritesConfig.background, sizeConfig.width, sizeConfig.heith, 10, 10, 10, 10).setOrigin(this.dir,0.5);
        this.barFill = scene.add.nineslice(0, 0, 'ui', spritesConfig.fill, sizeConfig.width, sizeConfig.heith-marginHeith, 10, 20, 20, 20).setOrigin(this.dir,0.5);
        this.barFrame = scene.add.nineslice(0, 0, 'ui', spritesConfig.frame, sizeConfig.width, sizeConfig.heith, 10, 10, 10, 10).setOrigin(this.dir,0.5);


        this.add([this.background,this.barFill,this.barFrame]);

        scene.add.existing(this);
    }
    preUpdate(t,dt){

    }

    /**
     * Establece el valor que representa la barra
     * @param {*} value 
     */
    setValue(value){
        let valueCal = (value/this.maxValue * this.barWidth);
        this.barFill.width = valueCal < this.barWidth ? valueCal : this.barWidth;
    }
    /**
     * Establece el valor maximo que puede alcanzar la barra
     * @param {*} val 
     */
    setMaxValue(val){
        this.maxValue = val;
    }
}