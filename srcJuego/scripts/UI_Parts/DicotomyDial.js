/**
 * Clase para el dial de las dicotomias usado tanto en la UI como en el menu de mejora
 * 
 */
export default class Dial extends Phaser.GameObjects.Container{
    constructor(scene,x,y,dialNumber){
        super(scene,x,y)
        //numero de dicotomia
        this.dialNumber = dialNumber;

        this.dicotomyManager = scene.mainScene.dicotomyManager;

        //valor de la dicotomia a representar
        this.dicValue =  this.dicotomyManager['perDic' + dialNumber];

        this.dicName = this.dicotomyManager.dicName(dialNumber);

        //objetos del contenedor
        this.backbround = scene.add.image(0,0,'marcoDialBG').setOrigin(0.5,0.5);
        this.dialRect = scene.add.rectangle(0,0,5,25, 0xff0000).setOrigin(0.5,0.5);
        this.marco = scene.add.image(0,0,'marcoDialFrame').setOrigin(0.5,0.5)
        const textFormat = { font: '30px JosefinMedium', fill: 'white' }
        this.text = scene.add.text(0, 40,this.dicName + ' ' + this.dicValue, textFormat).setOrigin(0.5,0.5)


        //colocacion del dial
        this.dialRect.x = (this.dicValue-50)*150/100;

        this.add([this.backbround,this.marco,this.dialRect,this.text]);

        scene.add.existing(this);
    }
    preUpdate(t,dt){
        this.updateDial();
    }
    updateDial(){
        this.dicValue =  this.dicotomyManager['perDic' + this.dialNumber];
        this.dialRect.x = (this.dicValue-50)*150/100;
        this.text.setText(this.dicName + ' ' + this.dicValue);
    }
}