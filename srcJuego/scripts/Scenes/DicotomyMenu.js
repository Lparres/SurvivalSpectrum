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
        'Life: '+this.player.maxLife+'\n'+
        'Life Reg.: '+'\n'+
        'Damage: '+this.player.damage+'\n'+
        'Melee Armor: '+ this.player._meleeArmor+'\n'+
        'Range Armor: '+ this.player._rangeArmor+'\n'+
        'Range: '+this.player.range+'\n'+
        'Speed: '+this.player.speed+'\n';

        this.statsObj = this.add.text(0,0,this.statsText, 
            {   
                font: '40px JosefinBold', 
                fill: 'white', 
                aling:'center',
                fixedWidth: 300
            }).setOrigin(0.5,0.5);

        var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
        const fondo = this.add.rectangle(0, 0, 1000, 1000, 0x6666ff);
        const titulo = this.add.text(0, -450, 'Menu dicotomias', { font: '40px JosefinBold', fill: 'black', aling:'center' }).setOrigin(0.5,0);

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

        this.polvosMagicos = this.add.text(-350, -450,this.player.dust , { font: '40px JosefinBold', fill: 'black', aling:'center' }).setOrigin(0.5,0);
        centro.add(this.polvosMagicos);

        var container1 =new DicContainer(this,0,-320, 1);
        centro.add(container1);

        var container2 = new DicContainer(this,0,-220,2);
        centro.add(container2);

        var container3 = new DicContainer(this,0,-120,3);
        centro.add(container3);

        var container4 = new DicContainer(this,0,-20,4);
        centro.add(container4);



        var lateral= this.add.container(220,this.sys.game.canvas.height / 2);
        const fondoLat = this.add.rectangle(0, 0, 390, 800, 0x5bbf21);
        lateral.add(fondoLat);
        lateral.add(this.statsObj);
    }
    update(t,dt){
        this.statsText = 
        'Life: '+this.player.maxLife+'\n'+'\n'+
        'Life Reg.: '+'\n'+'\n'+
        'Damage: '+this.player.damage+'\n'+'\n'+
        'Melee Arm.: '+ this.player._meleeArmor+'\n'+'\n'+
        'Range Arm.: '+ this.player._rangeArmor+'\n'+'\n'+
        'Range: '+this.player.range+'\n'+'\n'+
        'Speed: '+this.player.speed;
        this.polvosMagicos.setText('polvos ' + this.player.dust);
        this.statsObj.setText(this.statsText);
    }
}
class DicContainer extends Phaser.GameObjects.Container{
    constructor(scene, x, y,dic){
        super(scene,x,y);
        this.dicNum = dic;
        switch(dic){
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
        this.add(scene.add.rectangle(0,0,700,90,0xffffff));
        this.dicValText = scene.add.text(0, 0, 'Dic '+ this.dicNum +' '+this.dicPer, { font: '40px JosefinBold', fill: 'black', aling:'center' }).setOrigin(0.5,0);
        this.add(this.dicValText);
        this.add(new Button(scene,-300,0, 'kirby', 0.15,()=>{
            this.SubDicotomy(this.dicNum);
            scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
            this.dicValText.setText('Dic '+ this.dicNum +' '+this.dicPer);
        }))
        this.add(new Button(scene,300,0, 'kirby', 0.15,()=>{
            this.AddDicotomy(this.dicNum);
            scene.scene.get('level').dicotomyManager.AplieDicotomy(this.dicNum);
            this.dicValText.setText('Dic '+ this.dicNum +' '+this.dicPer);
        }))
    }

    AddDicotomy(dic){
        switch(dic){
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
    SubDicotomy(dic){
        switch(dic){
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
}
