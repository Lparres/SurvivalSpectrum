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

        // Background
        this.add.image(0, 0, 'gameOverBg').setOrigin(0,0);

        // Texto de "GAME OVER"
        this.add.image(960, 200, 'gameOverText');

        // Texto de "YOUR FINAL PERSONALITY"
        this.add.image(960, 420, 'yourFinalPersonality');

        // Boton de volver al menu principal
        const restart = new Button(this, 1600, 920, 'tryAgainButton', 1, () => {
            this.scene.wake('StartMenu');
            this.scene.sleep('FinalScene');

        })

        //diales dicotomias
        //CLASES OBSOLETAS HAY QUE CAMBIARLAS A LAS NUEVAS
        this.dic1 = new DicContainer(this,350,430,1);
        this.dic2 = new DicContainer(this,350,580,2);
        this.dic3 = new DicContainer(this,350,730,3);
        this.dic4 = new DicContainer(this,350,880,4);


        // Texto siglas personalidad
        this.personality = this.add.text(960, 530, this.getPesonalityName(), 
        { font: '60px JosefinBold', fill: '#FFFFFF',align:'center' }).setOrigin(0.5,0.5);;


        // Texto nombre personalidad
        this.nameText = this.add.text(960, 620, this.personalityTexts[this.getPesonalityName()].name, 
        { font: '60px JosefinBold', fill: '#FFFFFF',align:'center' }).setOrigin(0.5,0.5);;
           


        //texto descripcion
        this.descText = this.add.text(660,720, this.personalityTexts[this.getPesonalityName()].text, 
        { font: '35px JosefinMedium', fill: '#754c24', align: 'left', wordWrap:{width: '600'} }).setOrigin(0, 0);


         //texto autor
         this.authorText = this.add.text(1260, 950, "— " + this.personalityTexts[this.getPesonalityName()].author + " —", 
         { font: '30px JosefinMediumItalic', fill: '#754c24', align: 'right', wordWrap:{width: '600'} }).setOrigin(1, 0.5);



        /**
         * Estadísticas finales
         */
        // Stats background
        this.add.image(1598, 600, 'finalStats');

        const textFormat = { font: '25px JosefinBold', fill: 'PaleTurquoise', align:'center' };

        // Wave
        this.waveText = this.add.text(1515, 450,"WAVE\rREACHED", textFormat).setOrigin(0.5, 0.5);
        this.waveInfo = this.add.text(1680, 450, this.wave, textFormat).setOrigin(0.5, 0.5);

        // Tiempo
        this.waveText = this.add.text(1515, 550,"TIME\rSURVIVED", textFormat).setOrigin(0.5, 0.5);
        this.waveInfo = this.add.text(1680, 550, this.finalTime.minutes+" : "+this.finalTime.seconds, textFormat).setOrigin(0.5, 0.5);

        // Kills
        this.waveText = this.add.text(1515, 650,"ENEMIES\rKILLED", textFormat).setOrigin(0.5, 0.5);
        this.waveInfo = this.add.text(1680, 650, this.killedEnemies, textFormat).setOrigin(0.5, 0.5);

        // Dust
        this.waveText = this.add.text(1515, 750,"DUST\rGAINED", textFormat).setOrigin(0.5, 0.5);
        this.waveInfo = this.add.text(1680, 750, this.totalDust, textFormat).setOrigin(0.5, 0.5);


        this.esc = this.input.keyboard.addKey('ESC');

        //salir de pantalla completa
        this.esc.on('up', event => {
            this.scale.stopFullscreen();
            document.getElementById("seccion-juego").className = "classSeccionJuego";
            document.getElementById("juego").className = "classJuego";
        })
    

        // Foreground
        this.add.image(0, 0, 'gameOverFg').setOrigin(0,0);
    }
    /**
     * calcula el nombre de la personlidad en funcion de las dicotomias
     */
    getPesonalityName(){
        let name = '';
        name += this.dicotomyManager.perDic2 > 50 ? 'E':'I';
        name += this.dicotomyManager.perDic3 > 50 ? 'N':'S';
        name += this.dicotomyManager.perDic1 > 50 ? 'F':'T';
        name += this.dicotomyManager.perDic4 > 50 ? 'P':'J';
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
        
        this.add(scene.add.image(0,0,'marcoDial2'));
        //this.add(scene.add.nineslice(0, 0, 'ui', 'SilverFrame', 380, 90, 10, 10, 10, 10));

        //texto del valor de la dicotomia
        this.dicValText = scene.add.text(0, 6, this.dicotomyManager.dicName(this.dicNum) + ' '+this.dicPer, { font: '26px JosefinMedium', fill: 'white', aling: 'center' }).setOrigin(0.5, 0);
        this.add(this.dicValText);


        this.dial = scene.add.rectangle((this.dicPer-50)*150/90, -2, 5,26, 0xff0000).setOrigin(0.5, 1);
        this.add(this.dial);

        this.scene.add.existing(this);
    }
    
}