import Button from "../UI_Objects/Button.js";
import Card from "../UI_Objects/Card.js"
import DicContainer from "../UI_Objects/DicDial.js";
import CardsZone from "../UI_Dicotomy_Parts/CardsZone.js";
import Stats from "../UI_Dicotomy_Parts/Stats.js";
export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });

  }
  init() {

  }
  preload() {

  }
  create() {
    this.mainScene = this.scene.get('level');
    ///obtener variables del level
    this.dicotomyManager = this.mainScene.dicotomyManager;
    this.player = this.mainScene.player;
    this.deck = this.mainScene.deck;

    this.cardsToPick = this.dicotomyManager.getCardsToPick();

    var centro = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
    const fondo = this.add.nineslice(0, -30, 'ui', 'DicotomyMenuBG', 1000, 900, 13, 13, 13, 13);
    const titulo = this.add.text(0, -478, 'Build your Personality', { font: '40px JosefinBold', fill: 'white', aling: 'center' }).setOrigin(0.5, 0);
    const cabecera = this.add.image(0, -450, 'cabeceraDicos').setOrigin(0.5, 0.5);
    //boton para salir del menú
    const unpause = new Button(this, 0, 415, 'confirm', 1, () => {

      if (this.cardsToPick <= 0) {
        let UI = this.scene.get('UIScene');
        let MainScene = this.scene.get('level');
        this.scene.wake('UIScene');
        this.scene.sleep('Menu');
        MainScene.scene.setActive(true);
        MainScene.music.resume();
      }
    })

    //añadir al contenedor central
    centro.add([fondo, unpause, cabecera, titulo]);

    centro.add(this.add.image(170, -90, 'polvos').setScale(0.08).setOrigin(0, 0.5));

    //texto de coste de polvos
    this.dustCost = this.add.text(5, -95, 'xxxx',
      { font: '35px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5 }).setOrigin(0.5, 0.5)

    //añadir texto al contenedor
    centro.add(this.dustCost);

    this.dustIMG = this.add.image(1860, 1000, 'polvos').setScale(0.1).setOrigin(1, 0.5);

    this.dust = this.add.text(1730, 1000, 'xxxx',
      { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5 }).setOrigin(1, 0.5);
    this.dustIMG = this.add.image(1860, 1000, 'polvos').setScale(0.1).setOrigin(1, 0.5);

    //añadir las barras de las dicotomías
    this.container1 = new DicContainer(this, -220, -320, 1);
    this.container2 = new DicContainer(this, 220, -320, 2);
    this.container3 = new DicContainer(this, -220, -180, 3);
    this.container4 = new DicContainer(this, 220, -180, 4);
    centro.add([this.container1, this.container2, this.container3, this.container4]);

    //añadir la zona de las cartas
    this.cards = new CardsZone(this, 0, 160, this.deck);
    centro.add(this.cards);

    //contenedor del bloque de estadisticas
    this.latcont = new Stats(this, 400, this.sys.game.canvas.height / 2).setScale(1.2);
    this.cardClick = this.sound.add('cardClick', { volume: 0.1 });
  }


  update(t, dt) {
    this.dustCost.setText("Adjustment cost: " + this.mainScene.dicPrice);
    this.dust.setText(this.player.dust);
  }
  updateCardsLeft() {
    this.cardsToPick--;
    this.cards.updateCardsLeftText();
  }
}