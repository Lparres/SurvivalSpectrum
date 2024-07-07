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
    const titulo = this.add.text(20, -478, 'Build your Personality', { font: '40px JosefinBold', fill: 'white', aling: 'center' }).setOrigin(0.5, 0);
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

    centro.add(this.add.image(120, -90, 'polvos').setScale(0.08).setOrigin(0, 0.5));

    //texto de coste de polvos
    this.dustCost = this.add.text(-50, -92, 'xxxx',
      { font: '35px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 3 }).setOrigin(0.5, 0.5)

    //añadir texto al contenedor
    centro.add(this.dustCost);

    this.dustIMG = this.add.image(1860, 990, 'polvos').setScale(0.1).setOrigin(1, 0.5);

    this.dust = this.add.text(1730, 1000, 'xxxx',
      { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5 }).setOrigin(1, 0.5);
    this.dustIMG = this.add.image(1860, 990, 'polvos').setScale(0.1).setOrigin(1, 0.5);

    //añadir las barras de las dicotomías
    this.container1 = new DicContainer(this, -220, -320, 1);
    this.container2 = new DicContainer(this, 220, -320, 2);
    this.container3 = new DicContainer(this, -220, -180, 3);
    this.container4 = new DicContainer(this, 220, -180, 4);
    centro.add([this.container1, this.container2, this.container3, this.container4]);

    //Cajas de las dicotomías interactivas
    this.container1.setSize(380, 90);
    this.container2.setSize(380, 90);
    this.container3.setSize(380, 90);
    this.container4.setSize(380, 90);
    this.container1.setInteractive();
    this.container2.setInteractive();
    this.container3.setInteractive();
    this.container4.setInteractive();

    // Grupo hint de las dicotomías
    this.dicoHint = this.add.group();
    this.panelBg = this.add.image(1690, 500, 'panelHintDicos').setOrigin(0.5, 0.5);
    this.titleDico1 = this.add.text(this.panelBg.x, this.panelBg.y - 392,' ',{ font: '35px JosefinMedium', fill: 'white', align: 'center', wordWrap:{width: '300'} }).setOrigin(0.5, 0);
    this.textDico1 = this.add.text(this.panelBg.x, this.panelBg.y - 320,'sdfsdfgsdfgg',{ font: '20px JosefinRegular', fill: 'white', align: 'left', wordWrap:{width: '300'} }).setOrigin(0.5, 0);
    this.titleDico2 = this.add.text(this.panelBg.x, this.panelBg.y + 12,'Emotional',{ font: '35px JosefinMedium', fill: 'white', align: 'center', wordWrap:{width: '300'} }).setOrigin(0.5, 0);
    this.textDico2 = this.add.text(this.panelBg.x, this.panelBg.y + 80,'sdfg',{ font: '20px JosefinRegular', fill: 'white', align: 'left', wordWrap:{width: '300'} }).setOrigin(0.5, 0);
    this.dicoHint.addMultiple([this.panelBg, this.titleDico1, this.textDico1,this.titleDico2, this.textDico2]);
    this.dicoHint.setVisible(false);

    // Textos
    this.title1_1 = 'Thinking (T)';
    this.title1_2 = 'Feeling (F)';
    this.title2_1 = 'Introversion (I)';
    this.title2_2 = 'Extraversion (E)';
    this.title3_1 = 'Sensing (S)';
    this.title3_2 = 'Intuition (I)';
    this.title4_1 = 'Judging (J)';
    this.title4_2 = 'Perceiving (P)';
    this.text1_1 = 'Reason and logic are your driving force for making decisions in life.\r\rBy taking preference on this parameter, your EUREKA! meter (blue) will fill up faster. What happens when you reach your brightest moment is no longer our responsibility.';
    this.text1_2 = 'Your sensations and emotions are the way you tend to make decisions.\r\rBy taking preference in this parameter, your RAGE (orange) meter will fill up faster, which will unleash your true inner fury, improving all your characteristics and gaining you life steal.';
    this.text2_1 = 'If you prefer to think about your inner world, this is your direction.\r\rBy taking preference over this parameter, your range will be increased while your damage will be reduced. So you will have more space for yourself.';
    this.text2_2 = 'If you prefer to focus on your surroundings and the people around you, this is your direction.\r\rBy taking preference in this parameter, your range will be reduced but your damage will be increased. For those who like the closeness to people.';
    this.text3_1 = 'If your senses are your best tool to perceive the environment, this is your direction.\r\rBy taking preference in this parameter, the interface will give you more and more information, so that you can analyse it and not feel lost.';
    this.text3_2 = 'If you enjoy ideas and concepts, and prefer to analyse the big picture, this is your direction\r\rBy taking preference on this parameter, the amount of information the interface will give you will be reduced. For those empty interface purists.';
    this.text4_1 = 'If you always need the best possible planning when it comes to doing something, this is the direction for you.\r\rTaking precedence over this parameter means having things more prepared, so you will have a greater number of cards to choose from, albeit with less value each.';
    this.text4_2 = 'If in a plan you are the one who goes with the flow and adapts to the circumstances, this is your direction.\r\rBy taking preference on this parameter, you will be able to take advantage of your ability to improvise, giving you a smaller number of cards to choose from, but with greater potential each.';

    // OnHover de las dicotomías
    this.container1.on('pointerover', () => {
      this.titleDico1.setText(this.title1_1);
      this.textDico1.setText(this.text1_1);
      this.titleDico2.setText(this.title1_2);
      this.textDico2.setText(this.text1_2);
      this.dicoHint.setVisible(true);
    });
    this.container1.on('pointerout', () => {
      this.dicoHint.setVisible(false)
    });
    this.container2.on('pointerover', () => {
      this.titleDico1.setText(this.title2_1);
      this.textDico1.setText(this.text2_1);
      this.titleDico2.setText(this.title2_2);
      this.textDico2.setText(this.text2_2);
      this.dicoHint.setVisible(true);
    });
    this.container2.on('pointerout', () => {
      this.dicoHint.setVisible(false)
    });
    this.container3.on('pointerover', () => {
      this.titleDico1.setText(this.title3_1);
      this.textDico1.setText(this.text3_1);
      this.titleDico2.setText(this.title3_2);
      this.textDico2.setText(this.text3_2);
      this.dicoHint.setVisible(true);
    });
    this.container3.on('pointerout', () => {
      this.dicoHint.setVisible(false)
    });
    this.container4.on('pointerover', () => {
      this.titleDico1.setText(this.title4_1);
      this.textDico1.setText(this.text4_1);
      this.titleDico2.setText(this.title4_2);
      this.textDico2.setText(this.text4_2);
      this.dicoHint.setVisible(true);
    });
    this.container4.on('pointerout', () => {
      this.dicoHint.setVisible(false)
    });


    //añadir la zona de las cartas
    this.cards = new CardsZone(this, 0, 160, this.deck);
    centro.add(this.cards);

    //contenedor del bloque de estadisticas
    this.latcont = new Stats(this, 400, this.sys.game.canvas.height / 2).setScale(1.2);
    this.cardClick = this.sound.add('cardClick', { volume: 0.1 });



    // Tutorial
    this.tutorial1 = this.add.image(960, 540, 'tutorial_1');
    this.tutorial2 = this.add.image(960, 540, 'tutorial_2');
    
    this.tutorial1.setVisible(false);
    this.tutorial2.setVisible(false);

    // Si linea 1 descomentada -> el tutorial se enseña siempre
    // Si linea 2 descomentada -> el tutorial solo se muestra una vez
    //this.tutorialDone = false;
    this.tutorialDone = sessionStorage.getItem('SurvivalSpectrum_TutorialDone') || false;

    this.time.addEvent({
      delay: 2000, // milisegundos
      callback: this.showTutorial,
      callbackScope: this,
      loop: false
    });

    this.tutorial1.setInteractive();
    this.tutorial2.setInteractive();

    this.tutorial1.on('pointerdown', () => {
      this.tutorial1.setVisible(false);
      this.tutorial2.setVisible(true);
    });

    this.tutorial2.on('pointerdown', () => {
      this.tutorial1.setVisible(false);
      this.tutorial2.setVisible(false);
      sessionStorage.setItem('SurvivalSpectrum_TutorialDone', true);
    });

  }


  update(t, dt) {
    this.dustCost.setText("Adjustment cost:  " + this.mainScene.dicPrice);
    this.dust.setText(this.player.dust);
  }
  updateCardsLeft() {
    this.cardsToPick--;
    this.cards.updateCardsLeftText();
  }

  showTutorial(){
    if(this.tutorialDone === false){
      console.log("hola")
      this.tutorial1.setVisible(true);
    }
  }
}