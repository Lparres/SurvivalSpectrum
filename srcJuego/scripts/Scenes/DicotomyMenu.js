import Button from "../UI_Objects/Button.js";
import MainScene from "./Scene.js";

export default class Menu extends Phaser.Scene {


    constructor() {
        super({ key: "Menu" });

    }
    init() {

    }
    preload() {
        this.load.image('mas', 'srcJuego/img/simbolo_mas.png')
    }
    create() {
        this.dicotomyManager = this.scene.get('level').dicotomyManager;
        this.player = this.scene.get('level').player;
        //console.log(this.player)
        this.statsText =
            'Life: ' + this.player.maxLife + '\n' +
            'Life Reg.: ' + '\n' +
            'Damage: ' + this.player.damage + '\n' +
            'Melee Armor: ' + this.player._meleeArmor + '\n' +
            'Range Armor: ' + this.player._rangeArmor + '\n' +
            'Range: ' + this.player.range + '\n' +
            'Speed: ' + this.player.speed + '\n';

        const statsTextConfig = {
            font: '40px JosefinBold',
            fill: 'white',
            aling: 'right',
            fixedWidth: 300
        }
        //this.statsObj = this.add.text(200,0,this.statsText, 
        //    {   
        //        font: '40px JosefinBold', 
        //        fill: 'white', 
        //        aling:'center',
        //        fixedWidth: 300
        //    }).setOrigin(0.5,0.5);

        var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
        const fondo = //this.add.nineslice(0, 0, 'ui', 'GreenBar', 1000, 1000, 10, 20, 20, 20);
            this.add.rectangle(0, 0, 1000, 1000, 0x6666ff);
        const titulo = this.add.text(0, -450, 'Menu dicotomias', { font: '40px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);

        const unpause = new Button(this, 0, 400, 'heart', 0.15, () => {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Menu');
            MainScene.scene.setActive(true);
        })



        centro.add(fondo);
        centro.add(unpause);
        centro.add(titulo);

        this.polvosMagicos = this.add.text(-350, -450, this.player.dust, { font: '40px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        centro.add(this.polvosMagicos);

        this.container1 = new DicContainer(this, -200, -320, 1);
        centro.add(this.container1);

        this.container2 = new DicContainer(this, 200, -320, 2);
        centro.add(this.container2);

        this.container3 = new DicContainer(this, -200, -180, 3);
        centro.add(this.container3);

        this.container4 = new DicContainer(this, 200, -180, 4);
        centro.add(this.container4);

        //var lat = new StatsContainer(this, 0,0);

        //var lateral= this.add.container(220,this.sys.game.canvas.height / 2);
        //const fondoLat = this.add.nineslice(0, 0, 'ui', 'GreyBG', 390, 800, 10, 10, 10, 10).setOrigin(0,0.5);

        //lateral.add(this.statsObj);

        this.latcont = new LatContainer(this, 400, this.sys.game.canvas.height / 2).setScale(1.2);
        //this.add.existing(this.latcont)
        //centro.add(this.latcont);
    }
    update(t, dt) {
        //this.statsText = 
        //'Life: '+this.player.maxLife+'\n'+'\n'+
        //'Life Reg.: '+'\n'+'\n'+
        //'Damage: '+this.player.damage+'\n'+'\n'+
        //'Melee Arm.: '+ this.player._meleeArmor+'\n'+'\n'+
        //'Range Arm.: '+ this.player._rangeArmor+'\n'+'\n'+
        //'Range: '+this.player.range+'\n'+'\n'+
        //'Speed: '+this.player.speed;
        this.polvosMagicos.setText('polvos: ' + this.player.dust);
        //this.statsObj.setText(this.statsText);
    }
}
class DicContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dic) {
        const dicPrice = 1;
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
        this.add(scene.add.rectangle(0, 0, 380, 90, 0xffffff));
        this.add(scene.add.nineslice(0, 0, 'ui', 'GreyBG', 380, 90, 10, 10, 10, 10));
        this.dicValText = scene.add.text(0, 0, this.dicotomyManager.dicName(this.dicNum) + ' '+this.dicPer, { font: '35px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        this.add(this.dicValText);


        this.dial = scene.add.rectangle(20, 0, 5, 40, 0xff0000).setOrigin(0.5, 0.8).setDepth(5);
        this.add(this.dial);

        //boton de bajar dicotomia
        this.add(new Button(scene, -135, 0, 'kirby', 0.10, () => {
            if (scene.player.dust > 0 && this.dicPer > 0) {
                this.SubDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= dicPrice;
            }
        }))

        //boton de subir dicotomia
        this.add(new Button(scene, 135, 0, 'mas', 0.10, () => {
            if (scene.player.dust > 0 && this.dicPer < 100) {
                this.AddDicotomy(this.dicNum);
                scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
                this.dicValText.setText(this.dicotomyManager.dicName(this.dicNum) + ' ' + this.dicPer);
                scene.player.dust -= dicPrice;//pasar a un parametro que pueda aumentar segun algun criterio
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
        //console.log(this.dial)
        //console.log(this.dial.x, this.dicPer);
    }
    
}
class LatContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y)
        //const fondoLat = scene.add.nineslice(0, 0, 'ui', 'GreyBG', 390, 800, 10, 10, 10, 10).setOrigin(0, 0.5);

        //this.add(fondoLat);



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





        //this.lifeText = scene.add.text(margin + x, verticalSpacing + spacig, "Life:", statsTextConfig).setOrigin(0, 1);
        //this.lifeRegText = scene.add.text(margin + x, verticalSpacing + spacig * 2, "Life Reg:", statsTextConfig).setOrigin(0, 1);
        //this.damageText = scene.add.text(margin + x, verticalSpacing + spacig * 3, "Damage:", statsTextConfig).setOrigin(0, 1);
        //this.meleeArmorText = scene.add.text(margin + x, verticalSpacing + spacig * 4, "Melee Armor:", statsTextConfig).setOrigin(0, 1);
        //this.rangeArmorText = scene.add.text(margin + x, verticalSpacing + spacig * 5, "Range Armor:", statsTextConfig).setOrigin(0, 1);
        //this.rangeText = scene.add.text(margin + x, verticalSpacing + spacig * 6, "Range:", statsTextConfig).setOrigin(0, 1);
        //this.speedText = scene.add.text(margin + x, verticalSpacing + spacig * 7, "Speed:", statsTextConfig).setOrigin(0, 1);
//
        //this.title = scene.add.text(0, 0, "Stats", statsTextConfig).setOrigin(0.5, 0);

        //this.add(this.title);
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
        this.lifeRegenInfo.setText("xxxx");
        this.damageInfo.setText(Phaser.Math.RoundTo(this.scene.player.damage,-3));
        this.fireRateInfo.setText("xxxx");
        this.meleeArmorInfo.setText(Phaser.Math.RoundTo(this.scene.player._meleeArmor));
        this.rangeArmorInfo.setText(Phaser.Math.RoundTo(this.scene.player._rangeArmor));
        this.rangeInfo.setText(Phaser.Math.RoundTo(this.scene.player.range));
        this.speedInfo.setText(Phaser.Math.RoundTo(this.scene.player.speed));
    }
}