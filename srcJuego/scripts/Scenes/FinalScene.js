import Button from "../UI_Objects/Button.js";

export default class FinalScene extends Phaser.Scene {

    constructor() {
        super({ key: "FinalScene" });
        
    }

    init(data){
        this.dicotomyManager = data.dicManager;
        this.finalTime = data.finalTime;
        this.wave = data.wave;
        this.killedEnemies = data.killedEnemies;

        this.totalDust = data.totalDust; 

        this.personalityTexts = data.personalityTexts;
    }

    preload(){
        
    }

    create(){


        //Game Over text
        this.end = this.add.text(this.sys.game.canvas.width / 2, 65, 'GAME OVER', { font: '64px Arial', fill: '#FFFFFF' }).setOrigin(0.5,0.5);

        //boton de volver al menu principal
        const restart = new Button(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 100, 'tryAgainButton', 1, () => {
            this.scene.wake('StartMenu');
            this.scene.sleep('FinalScene');

        })

        this.BGL = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 500, 800 , 20, 20, 20, 20);
        
        /**
         * Zona de la izquierda con los diales de las dicotomias
         */

        //contenedor con los diales de las dicotomias desbalanceados
        const left = this.add.container(this.sys.game.canvas.width / 2 - 600, this.sys.game.canvas.height / 2 );
        left.add(this.BGL);
        //diales dicotomias
        this.dic1 = left.add(new DicContainer(this,0,-300,1));
        this.dic2 = left.add(new DicContainer(this,0,-100,2));
        this.dic3 = left.add(new DicContainer(this,0,100,3));
        this.dic4 = left.add(new DicContainer(this,0,300,4));
        


        /**
         * Zona central donde se encuentra el nombre de la personalidad y a futuro un icono de la misma
         */
        const center = this.add.container(this.sys.game.canvas.width /2, this.sys.game.canvas.height / 2 );
        this.BGC = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 650, 800 , 20, 20, 20, 20);
        center.add(this.BGC);    

        this.personality = this.add.text(0, 0, "Your final personality:\n"+this.getPesonalityName(), 
        { font: '64px Arial', fill: '#FFFFFF',align:'center' }).setOrigin(0.5,0.5);

        center.add(this.personality);

        //console.log(this.getPesonalityName());
        //console.log(this.personalityTexts["EINP"]);
        this.text = this.add.text(0, 300, this.personalityTexts[this.getPesonalityName()].name, 
        { font: '40px Arial', fill: '#FFFFFF',align:'center' }).setOrigin(0.5,0.5);
        
        
        
        center.add(this.text);

        const textFormat = { font: '64px Arial', fill: '#FFFFFF',align:'left' };


        /**
         * Zona derecha donde se mostrara informacion del rendimiento de la partida (Pasar a clase container??????)
         */
        const right= this.add.container(this.sys.game.canvas.width / 2 + 600, this.sys.game.canvas.height / 2 );

        this.BGR = this.add.nineslice(0, 0, 'ui', 'CardsMenu', 500, 800 , 20, 20, 20, 20);    
        right.add(this.BGR);

        //tiempo final
        this.waveText = this.add.text(-220, -300,"Wave: "+ this.wave,textFormat)
        right.add(this.waveText);

        this.endTimeText = this.add.text(-220, -200,"End time: "+ this.finalTime.minutes+":"+this.finalTime.seconds,textFormat)
        right.add(this.endTimeText);


        this.killedEnemiesText = this.add.text(-220, -100,"Total enemies \nkilled: "+ this.killedEnemies,textFormat)
        right.add(this.killedEnemiesText);

        this.totalDustText = this.add.text(-220, 70,"Total Dust: "+ this.totalDust,textFormat)
        right.add(this.totalDustText);

        this.esc = this.input.keyboard.addKey('ESC');

        //salir de pantalla completa
        this.esc.on('up', event => {
            this.scale.stopFullscreen();
            document.getElementById("seccion-juego").className = "classSeccionJuego";
            document.getElementById("juego").className = "classJuego";
        })
    
    }
    /**
     * calcula el nombre de la personlidad en funcion de las dicotomias
     */
    getPesonalityName(){
        let name = '';
        name += this.dicotomyManager.perDic1 < 50 ? 'E':'I';
        name += this.dicotomyManager.perDic2 < 50 ? 'N':'S';
        name += this.dicotomyManager.perDic3 < 50 ? 'T':'F';
        name += this.dicotomyManager.perDic4 < 50 ? 'J':'P';
        return name;
    }

    update(){
        
    }

}

class DicContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dic) {

        super(scene, x, y);

        this.dicNum = dic;
        this.dicotomyManager =scene.dicotomyManager;

        this.dicPer = scene.dicotomyManager.getDic(dic);
        
        this.add(scene.add.image(0,0,'marcoDial'));
        //this.add(scene.add.nineslice(0, 0, 'ui', 'SilverFrame', 380, 90, 10, 10, 10, 10));

        //texto del valor de la dicotomia
        this.dicValText = scene.add.text(0, 0, this.dicotomyManager.dicName(this.dicNum) + ' '+this.dicPer, { font: '30px JosefinBold', fill: 'black', aling: 'center' }).setOrigin(0.5, 0);
        this.add(this.dicValText);


        this.dial = scene.add.rectangle((this.dicPer-50)*150/90, -2, 5,26, 0xff0000).setOrigin(0.5, 1);
        this.add(this.dial);

        this.scene.add.existing(this);
    }
    
}