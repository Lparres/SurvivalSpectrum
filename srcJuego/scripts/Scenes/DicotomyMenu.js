import Button from "../UI_Objects/Button.js";
import Card from "../UI_Objects/Card.js"

export default class Menu extends Phaser.Scene {
    
    
    constructor() {
        super({ key: "Menu" });
        
    }
    init() {
        
    }
    preload() {
        
    }
    create() {
        this.dicotomyManager = this.scene.get('level').dicotomyManager;
        this.player = this.scene.get('level').player;
        
        this.cardsToPick = 3;
        
        var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
        const fondo = this.add.nineslice(0, 0, 'ui', 'DicotomyMenuBG', 1000, 1000, 13, 13, 13, 13);
        //this.add.rectangle(0, 0, 1000, 1000, 0x6666ff);
        const titulo = this.add.text(0, -450, 'Build your Personality', { font: '40px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        
        //boton para salir del menú
        const unpause = new Button(this, 0, 400, 'heart', 0.15, () => {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Menu');
            MainScene.scene.setActive(true);
            MainScene.music.resume();
        })
        
        centro.add(fondo);
        centro.add(unpause);
        centro.add(titulo);
        
        
        
        //centro.add(this.add.image(-5,-80,'polvos').setScale(0.08).setOrigin(1,0.5));
        
        this.dustCost = this.add.text(5, -80,'xxxx', 
        { font: '40px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(0.5,0.5)
        
        centro.add(this.dustCost);
        
        
        this.dustIMG = this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        
        this.dust = this.add.text(1730, 1000,'xxxx', 
        { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(1,0.5);
        this.dustIMG = this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        
        this.container1 = new DicContainer(this, -200, -320, 1);
        centro.add(this.container1);
        this.container2 = new DicContainer(this, 200, -320, 2);
        centro.add(this.container2);
        this.container3 = new DicContainer(this, -200, -180, 3);
        centro.add(this.container3);
        this.container4 = new DicContainer(this, 200, -180, 4);
        centro.add(this.container4);
        
        this.cards = new CardsZone(this,0,160,8);
        centro.add(this.cards);
        
        //contenedor del bloque de estadisticas
        this.latcont = new LatContainer(this, 400, this.sys.game.canvas.height / 2).setScale(1.2);
        
        this.dicPrice = 20;
    }
    
    
    update(t, dt) {
        this.dustCost.setText("Change Price: " +this.dicPrice);
        this.dust.setText(this.player.dust);
    }
}

/**
 * Clase para organizar los diales de dicotomias
*/
class DicContainer extends Phaser.GameObjects.Container {
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


        this.dial = scene.add.rectangle(20, 0, 5,25, 0xff0000).setOrigin(0.5, 1);
        this.add(this.dial);

        //boton de bajar dicotomia
        this.add(new Button(scene, -135, 0, 'decrease', 1, () => {
            if (scene.player.dust > scene.dicPrice && this.dicPer > 0) {
                this.SubDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= scene.dicPrice;
                scene.dicPrice += 5;
            }
        }))

        //boton de subir dicotomia
        this.add(new Button(scene, 135, 0, 'increase', 1, () => {
            if (scene.player.dust > scene.dicPrice && this.dicPer < 100) {
                this.AddDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= scene.dicPrice;//pasar a un parametro que pueda aumentar segun algun criterio
                scene.dicPrice += 5;
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

/**
 * Contenedor para el bloque de estadisticas
 */
class LatContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.estadisticasImg = scene.add.image(0, 0, 'estadisticas').setOrigin(1, 0.5).setScale(1, 1);
        this.add(this.estadisticasImg);


        this.lifeInfo = scene.add.text(-20, -200, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.lifeRegenInfo = scene.add.text(-20, -138, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.damageInfo = scene.add.text(-20, -76, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.fireRateInfo = scene.add.text(-20, -14, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.meleeArmorInfo = scene.add.text(-20, 48, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeArmorInfo = scene.add.text(-20, 110, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeInfo = scene.add.text(-20, 172, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.speedInfo = scene.add.text(-20, 234, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);


        this.add(this.lifeInfo);
        this.add(this.lifeRegenInfo);
        this.add(this.damageInfo);
        this.add(this.fireRateInfo);
        this.add(this.meleeArmorInfo);
        this.add(this.rangeArmorInfo);
        this.add(this.rangeInfo);
        this.add(this.speedInfo)

        this.scene.add.existing(this);

    }

    preUpdate(t, dt) {
        this.lifeInfo.setText(this.scene.player.maxLife);
        this.lifeRegenInfo.setText(this.scene.player.lifeReg);
        this.damageInfo.setText(Phaser.Math.RoundTo(this.scene.player.damage,-3));
        this.fireRateInfo.setText(this.scene.player._atkCD /1000);
        this.meleeArmorInfo.setText(Phaser.Math.RoundTo(this.scene.player._meleeArmor));
        this.rangeArmorInfo.setText(Phaser.Math.RoundTo(this.scene.player._rangeArmor));
        this.rangeInfo.setText(Phaser.Math.RoundTo(this.scene.player.range));
        this.speedInfo.setText(Phaser.Math.RoundTo(this.scene.player.speed));
    }
}
/**
 * Clase para las zona de las cartas (en progreso)
 * Genera tantas cartas en forma de matriz como se le diga a la constructora
 */
class CardsZone extends Phaser.GameObjects.Container{
    constructor(scene,x,y, cardsNum){
        super(scene,x,y);

        this.w = 800;
        this.h = 400;

        this.cardW = 100;
        this.cardH = 140;

        this.spacingHor = 100;

        //marco de la zona
        this.add(scene.add.nineslice(0, 0, 'ui', 'CardsMenu', this.w, this.h , 20, 20, 20, 20));

        this.card1= new Card(this.scene,-this.w/2 +50, -this.h/2 +40,'Atack',3);
        //this.card1.setOrigin(0,0)
        this.add(this.card1);

        /*posicionamiento de cartas en forma de matriz respecto de la carta 1
        * se puede aprovechar para indicar la carta que toca
        */
        for(var i=1 ; i< cardsNum; i++){
            this.card2= new Card(this.scene,this.card1.x + (i%4) * (this.cardW + this.spacingHor),this.card1.y + Math.floor(i/4)*150,'Atack',i);
            //this.card2.setOrigin(0,0)
            this.add(this.card2);
        }

        this.scene.add.existing(this);
    }
}