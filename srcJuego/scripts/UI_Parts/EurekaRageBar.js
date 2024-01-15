import Bar from "../UI_Objects/FillableBar.js"
/**
 * Clase para las barras y el icono de Eureka y de Rabia
 */
export default class RageEureka extends Phaser.GameObjects.Container{
    constructor(scene,x,y){
        super(scene,x,y)

        let spritesRageBar = {
            background: "GreyBG",
            fill:"OrangeBar",
            frame:"BlackFrame",
        }
        let spritesEurekaBar = {
            background: "GreyBG",
            fill:"BlueBar",
            frame:"BlackFrame",
        }
        let sizeHealthBar = {
            width: 265,
            heith: 50
        }
        //icono dual
        this.icono = scene.add.image(0, 0, 'furiaEureka').setOrigin(0.5, 0.5).setScale(1, 1);
        //barra de rabia
        this.rageBar = new Bar(scene,18,0,215,spritesRageBar,sizeHealthBar);
        //barra de eureka
        this.eurekaBar = new Bar(scene,-18,0,215,spritesEurekaBar,sizeHealthBar,false);
        	
        this.add([this.rageBar,this.eurekaBar,this.icono]);

        scene.add.existing(this);

    }
    setRage(value,maxValue){
        this.rageBar.setValue(value);
        this.rageBar.setMaxValue(maxValue);
    }
    setEureka(value,maxValue){
        this.eurekaBar.setValue(value);
        this.eurekaBar.setMaxValue(maxValue);
    }
}