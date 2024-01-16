import Button from "../UI_Objects/Button.js";
import Dial from "../UI_Parts/DicotomyDial.js";
/**
 * Clase para los diales en el menu de mejora requiere de botones y de la clase dial
 */
export  default class DicContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dic) {
        super(scene, x, y);
        this.dicNum = dic;

        this.dicotomyManager = scene.scene.get('level').dicotomyManager;

        this.dicPer = this.dicotomyManager['perDic' + this.dicNum];
        
        //fondo de los diales
        this.add(scene.add.nineslice(0, 0, 'ui', 'GreyBG', 380, 90, 10, 10, 10, 10));
        
        //dial de las dicotomias
        this.dial = new Dial(scene,0,-15,dic);
       
        this.add(this.dial);

        //boton de bajar dicotomia
        this.add(new Button(scene, -135, 0, 'decrease', 1, () => {
            if (scene.player.dust >= scene.mainScene.dicPrice && this.dicPer > 0) {
                this.SubDicotomy();
                this.dicotomyManager.AplieDicotomy(this.dicNum);
                this.dial.updateDial();
                scene.player.dust -= scene.mainScene.dicPrice;
                scene.mainScene.dicPrice += 5;
            }
        }))

        //boton de subir dicotomia
        this.add(new Button(scene, 135, 0, 'increase', 1, () => {
            if (scene.player.dust >= scene.mainScene.dicPrice && this.dicPer < 100) {
                this.AddDicotomy(this.dicNum);
                this.dicotomyManager.AplieDicotomy(this.dicNum);
                this.dial.updateDial();
                scene.player.dust -= scene.mainScene.dicPrice;//pasar a un parametro que pueda aumentar segun algun criterio
                scene.mainScene.dicPrice += 5;
            }
        }))

        this.scene.add.existing(this);
    }
    /**
     * Metodo que aumenta el valor de la dicotomia
     * Se llama al pulsar el boton
     * @param {number} dic numero de la dicotomia
     */
    AddDicotomy() {
        this.dicPer = ++this.dicotomyManager['perDic' + this.dicNum];      
    }
    /**
     * Metodo que baja la dicotomia indicada
     * Se llama al pulsar el botón
     * @param {number} dic numero de dicotomia
     */
    SubDicotomy() {
        this.dicPer = --this.dicotomyManager['perDic' + this.dicNum];
    }

    preUpdate(t,dt){
        
    }
    
}