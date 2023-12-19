import Button from "../UI_Objects/Button.js";
export  default class DicContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dic) {
        super(scene, x, y);
        this.dicNum = dic;
        this.dicotomyManager =scene.scene.get('level').dicotomyManager;
        switch (dic) {
            case 1:
                this.dicPer = scene.scene.get('level').dicotomyManager.perDic1;
                break;
            case 2:
                this.dicPer = scene.scene.get('level').dicotomyManager.perDic2;
                break;
            case 3:
                this.dicPer = scene.scene.get('level').dicotomyManager.perDic3;
                break;
            case 4:
                this.dicPer = scene.scene.get('level').dicotomyManager.perDic4;
                break;
        }
        this.add(scene.add.image(0,0,'marcoDial'));
        //this.add(scene.add.nineslice(0, 0, 'ui', 'SilverFrame', 380, 90, 10, 10, 10, 10));
        this.dicValText = scene.add.text(0, 0, this.dicotomyManager.dicName(this.dicNum) + ' '+this.dicPer, { font: '30px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        this.add(this.dicValText);


        this.dial = scene.add.rectangle((this.dicPer-50)*150/90, -2, 5,26, 0xff0000).setOrigin(0.5, 1);
        this.add(this.dial);

        //boton de bajar dicotomia
        this.add(new Button(scene, -135, 0, 'decrease', 1, () => {
            if (scene.player.dust > scene.levelScene.dicPrice && this.dicPer > 0) {
                this.SubDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= scene.levelScene.dicPrice;
                scene.levelScene.dicPrice += 5;
            }
        }))

        //boton de subir dicotomia
        this.add(new Button(scene, 135, 0, 'increase', 1, () => {
            if (scene.player.dust > scene.levelScene.dicPrice && this.dicPer < 100) {
                this.AddDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= scene.levelScene.dicPrice;//pasar a un parametro que pueda aumentar segun algun criterio
                scene.levelScene.dicPrice += 5;
            }
        }))

        this.scene.add.existing(this);
    }
    /**
     * Metodo que aumenta el valor de la dicotomia
     * Se llama al pulsar el boton
     * @param {number} dic numero de la dicotomia
     */
    AddDicotomy(dic) {
        switch (dic) {
            case 1:
                this.dicPer = ++this.scene.scene.get('level').dicotomyManager.perDic1;
                break;
            case 2:
                this.dicPer = ++this.scene.scene.get('level').dicotomyManager.perDic2;
                break;
            case 3:
                this.dicPer = ++this.scene.scene.get('level').dicotomyManager.perDic3;
                break;
            case 4:
                this.dicPer = ++this.scene.scene.get('level').dicotomyManager.perDic4;
                break;
        }
        
    }
    /**
     * Metodo que baja la dicotomia indicada
     * Se llama al pulsar el botón
     * @param {number} dic numero de dicotomia
     */
    SubDicotomy(dic) {
        switch (dic) {
            case 1:
                this.dicPer = --this.scene.scene.get('level').dicotomyManager.perDic1;
                break;
            case 2:
                this.dicPer = --this.scene.scene.get('level').dicotomyManager.perDic2;
                break;
            case 3:
                this.dicPer = --this.scene.scene.get('level').dicotomyManager.perDic3;
                break;
            case 4:
                this.dicPer = --this.scene.scene.get('level').dicotomyManager.perDic4;
                break;
        }
    }




    preUpdate(t,dt){
        this.dial.x = (this.dicPer-50)*150/90;
    }
    
}