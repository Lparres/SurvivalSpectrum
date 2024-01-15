import Card from "../UI_Objects/Card.js";
/**
 * Clase para las zona de las cartas (en progreso)
 * Genera tantas cartas en forma de matriz como se le diga a la constructora
 * el deck es un objeto con el array de cartas
 */
export default class CardsZone extends Phaser.GameObjects.Container {
    constructor(scene, x, y, deck) {
      //llamada a la constructora de super
      super(scene, x, y);
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
      this.add(scene.add.nineslice(0, 0, 'ui', 'CardsMenu', this.w, this.h, 20, 20, 20, 20));
  
      //texto de cartas restantes
      this.cartasRestantes = scene.add.text(this.w / 2 - 20, this.h / 2 - 15, "cards left: " + this.scene.cardsToPick, { font: '30px JosefinMedium', fill: 'black' }).setOrigin(1, 1,);
      this.add(this.cartasRestantes);
  
      //crea una carta
      this.card1 = new Card(this.scene, -this.w / 2 + 50, -this.h / 2 + 40, this.deck[0], this.scene.scene.get('level').dicotomyManager.CardValue([this.deck[0]]).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        useGrouping: false,
        maximumFractionDigits: 2
      }));
      //this.card1.setOrigin(0,0)
      this.add(this.card1);
  
      /*posicionamiento de cartas en forma de matriz respecto de la carta 1
      * se puede aprovechar para indicar la carta que toca
      */
      for (let i = 1; i < this.deck.length; i++) {
        let x = this.card1.x + (i % 4) * (this.cardW + this.spacingHor);
        let y = this.card1.y + Math.floor(i / 4) * 150;
        //creamos la carta desde la deck
        let aux = new Card(this.scene, x, y, this.deck[i], this.scene.scene.get('level').dicotomyManager.CardValue([this.deck[i]]).toLocaleString('en-US', {
          minimumIntegerDigits: 1,
          useGrouping: false,
          maximumFractionDigits: 2
        }));
        //this.card2.setOrigin(0,0)
        this.add(aux);
      }
  
      this.scene.add.existing(this);
    }
  
    updateCardsLeftText() {
      this.cartasRestantes.setText("cards left: " + this.scene.cardsToPick);
    }
  }