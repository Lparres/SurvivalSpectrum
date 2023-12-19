import Button from "../UI_Objects/Button.js";
import Card from "../UI_Objects/Card.js"
import DicContainer from "../UI_Objects/DicDial.js";

export default class Menu extends Phaser.Scene {
    
    
    constructor() {
        super({ key: "Menu" });
        
    }
    init() {
        
    }
    preload() {
        
    }
    create() {
        this.levelScene = this.scene.get('level');

        ///obtener variables del level
        this.dicotomyManager = this.levelScene.dicotomyManager;
        this.player = this.levelScene.player;
        this.deck = this.levelScene.deck;
        
        this.cardsToPick = 3;
        
        var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 );

        const fondo = this.add.nineslice(0, -30 , 'ui', 'DicotomyMenuBG', 1000, 900, 13, 13, 13, 13);
        const titulo = this.add.text(0, -478, 'Build your Personality', { font: '40px JosefinBold', fill: 'white', aling: 'center' }).setOrigin(0.5, 0);
        const cabecera = this.add.image(0, -450, 'cabeceraDicos').setOrigin(0.5, 0.5);

        //boton para salir del menú
        const unpause = new Button(this, 0, 415, 'confirm', 1, () => {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Menu');
            MainScene.scene.setActive(true);
            MainScene.music.resume();
        })
        
        //añadir al contenedor central
        centro.add(fondo);
        centro.add(unpause);    
        centro.add(cabecera);
        centro.add(titulo);
        
        centro.add(this.add.image(170,-90,'polvos').setScale(0.08).setOrigin(0,0.5));
        
        //texto de coste de polvos
        this.dustCost = this.add.text(5, -95,'xxxx', 
        { font: '35px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(0.5,0.5)
        
        //añadir texto al contenedor
        centro.add(this.dustCost);
        
        
        this.dustIMG = this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        
        this.dust = this.add.text(1730, 1000,'xxxx', 
        { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(1,0.5);
        this.dustIMG = this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        
        //añadir las barras de las dicotomías
        this.container1 = new DicContainer(this, -220, -320, 1);
        centro.add(this.container1);
        this.container2 = new DicContainer(this, 220, -320, 2);
        centro.add(this.container2);
        this.container3 = new DicContainer(this, -220, -180, 3);
        centro.add(this.container3);
        this.container4 = new DicContainer(this, 220, -180, 4);
        centro.add(this.container4);
        
        //añadir la zona de las cartas
        this.cards = new CardsZone(this,0,160,this.deck);
        centro.add(this.cards);
        
        //contenedor del bloque de estadisticas
        this.latcont = new LatContainer(this, 400, this.sys.game.canvas.height / 2).setScale(1.2);
    }
    
    
    update(t, dt) {
        this.dustCost.setText("Adjustment cost: " +this.levelScene.dicPrice);
        this.dust.setText(this.player.dust);
    }

    updateCardsLeft(){
        this.cardsToPick --;
        this.cards.updateCardsLeftText();
    }
}

/**
 * Clase para organizar los diales de dicotomias
*/


/**
 * Contenedor para el bloque de estadisticas
 */
class LatContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.estadisticasImg = scene.add.image(0, 0, 'estadisticasOpaco').setOrigin(1, 0.5).setScale(1, 1);
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
 * el deck es un objeto con el array de cartas
 */
class CardsZone extends Phaser.GameObjects.Container{
    constructor(scene,x,y, deck){
        //llamada a la constructora de super
        super(scene,x,y); 
        this.deck = deck;
        //dimensiones de la zona
        this.w = 850;
        this.h = 400;

        //dimensiones de cada carta
        this.cardW = 100;
        this.cardH = 140;

        //padding horizontal entre cartas
        this.spacingHor = 100;

        //marco de la zona
        this.add(scene.add.nineslice(0, 0, 'ui', 'CardsMenu', this.w, this.h , 20, 20, 20, 20));

        //texto de cartas restantes
        this.cartasRestantes = scene.add.text(this.w/2 - 20, this.h/2 - 15, "cards left: " + this.scene.cardsToPick, { font: '30px JosefinMedium', fill: 'black' }).setOrigin(1, 1,);
        this.add(this.cartasRestantes);

        //crea una carta
        this.card1= new Card(this.scene,-this.w/2 +50, -this.h/2 +40,this.deck[0],Math.round(this.scene.scene.get('level').dicotomyManager.CardValue([this.deck[0]]).toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            useGrouping: false,
            maximumFractionDigits:2
          })));
        //this.card1.setOrigin(0,0)
        this.add(this.card1);

        /*posicionamiento de cartas en forma de matriz respecto de la carta 1
        * se puede aprovechar para indicar la carta que toca
        */
        for(let i=1 ; i< this.deck.length; i++){
            let x = this.card1.x + (i%4) * (this.cardW + this.spacingHor);
            let y = this.card1.y + Math.floor(i/4)*150;
            //creamos la carta desde la deck
            let aux= new Card(this.scene, x ,y,this.deck[i],Math.round(this.scene.scene.get('level').dicotomyManager.CardValue([this.deck[i]]).toLocaleString('en-US', {
                minimumIntegerDigits: 1,
                useGrouping: false,
                maximumFractionDigits:2
              })));
            //this.card2.setOrigin(0,0)
            this.add(aux);
        }

        this.scene.add.existing(this);
    }

    updateCardsLeftText(){
        this.cartasRestantes.setText("cards left: " + this.scene.cardsToPick);
    }
}