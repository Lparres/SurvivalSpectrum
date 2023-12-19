import Button from "../UI_Objects/Button.js";

export default class FinalScene extends Phaser.Scene {

    constructor() {
        super({ key: "FinalScene" });
        
    }

    init(data){
        this.dicotomyManager = data.dicManager;
    }

    preload(){
        
    }

    create(){
        console.log(this.dicotomyManager);
        this.end = this.add.text(this.sys.game.canvas.width / 2, 65, 'GAME OVER', { font: '64px Arial', fill: '#FFFFFF' }).setOrigin(0.5,0.5);

        const restart = new Button(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 100, 'tryAgainButton', 1, () => {
            this.scene.wake('StartMenu');
            this.scene.sleep('FinalScene');

        })

        this.BGL = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 500, 800 , 20, 20, 20, 20);
        
        //contenedor con los diales de las dicotomias desbalanceados
        const left = this.add.container(this.sys.game.canvas.width / 2 - 600, this.sys.game.canvas.height / 2 );
        left.add(this.BGL);
        this.dic1 = left.add(new DicContainer(this,0,-300,1));
        this.dic2 = left.add(new DicContainer(this,0,-100,2));
        this.dic3 = left.add(new DicContainer(this,0,100,3));
        this.dic4 = left.add(new DicContainer(this,0,300,4));
        

        const center = this.add.container(this.sys.game.canvas.width /2, this.sys.game.canvas.height / 2 );
        this.BGC = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 650, 800 , 20, 20, 20, 20);
        center.add(this.BGC);
        //calculo del nombre de la personalidad
        this.resultName = '';
        this.resultName += this.dicotomyManager.perDic1 < 50 ? 'T':'E';
        this.resultName += this.dicotomyManager.perDic2 < 50 ? 'E':'I';
        this.resultName += this.dicotomyManager.perDic3 < 50 ? 'S':'N';
        this.resultName += this.dicotomyManager.perDic4 < 50 ? 'J':'P';

        this.personality = this.add.text(0, 0, "Your final personality:\n"+this.resultName, 
        { font: '64px Arial', fill: '#FFFFFF',align:'center' }).setOrigin(0.5,0.5);

        center.add(this.personality);


        const right= this.add.container(this.sys.game.canvas.width / 2 + 600, this.sys.game.canvas.height / 2 );
        this.BGR = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 500, 800 , 20, 20, 20, 20);
        right.add(this.BGR);
    }

    update(){
        
    }

}

class DicContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dic) {
        super(scene, x, y);
        this.dicNum = dic;
        this.dicotomyManager =scene.dicotomyManager;
        switch (dic) {
            case 1:
                this.dicPer = scene.dicotomyManager.perDic1;
                break;
            case 2:
                this.dicPer = scene.dicotomyManager.perDic2;
                break;
            case 3:
                this.dicPer = scene.dicotomyManager.perDic3;
                break;
            case 4:
                this.dicPer = scene.dicotomyManager.perDic4;
                break;
        }
        this.add(scene.add.image(0,0,'marcoDial'));
        //this.add(scene.add.nineslice(0, 0, 'ui', 'SilverFrame', 380, 90, 10, 10, 10, 10));
        this.dicValText = scene.add.text(0, 0, this.dicotomyManager.dicName(this.dicNum) + ' '+this.dicPer, { font: '30px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        this.add(this.dicValText);


        this.dial = scene.add.rectangle((this.dicPer-50)*150/90, -2, 5,26, 0xff0000).setOrigin(0.5, 1);
        this.add(this.dial);

        this.scene.add.existing(this);
    }
    
}