export default class Dicotomías {
     /*
     *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
     perDic es el porcentaje (percentage) de cada dicotomía
     */
     /**
      * 
      * @param {*} perDic1 Valor del emocional
      * @param {*} perDic2 Valor del extrovertido
      * @param {*} perDic3 Valor del sensitivo
      * @param {*} perDic4 Valor del perspective
      */
     constructor(player, perDic1, perDic2, perDic3, perDic4, UI) {
          //porcentajes de las dicotomias
          this.perDic1 = perDic1;
          this.perDic2 = perDic2;
          this.perDic3 = perDic3;
          this.perDic4 = perDic4;

          this.player = player;
          this.UI = UI;

          //escena de nivel
          this.levelScene = this.UI.scene.get('level');


          //variables para los valores base de las dicotomias, estos deberian ir actualizandose, por ejemplo el de la vida del player
          this.rageBaseAmount = this.levelScene.data.PlayerConfig.life *1.5;
          this.eurekaBaseAmount = this.levelScene.player.dicUp   *150;
     }

     /**
      * 
      * @param {number} dic numero de dicotomia
      * @returns {number} porcentaje sin calcular de la dicotomia
      */
     getDic(dic) {
          switch (dic) {
               case 1:
                    return this.perDic1;
               case 2:
                    return this.perDic2;
               case 3:
                    return this.perDic3;
               case 4:
                    return this.perDic4;
          }
     }

     /**
      * devuelve el nombre de la dicotoia pedida
      * @param {number} dic numero de la dicotomia
      */
     dicName(dic) {
          switch (dic) {
               case 1:
                    return "R/E";
               case 2:
                    return "I/E";
               case 3:
                    return "S/I";
               case 4:
                    return "J/P";
          }
     }
     /**
      * 
      * @param {number} dic numero de dicotomia a la que quieres aplicar cambios
      */
     AplieDicotomy(dic) {
          switch (dic) {
               case 1: //dicotomia de mas o menos eureka            
                    this.player.rageMax = this.EmotionalValue();
                    this.player.eurekaMax = this.RationalValue();
                    break;
               case 2: //dicotomia de mas daño o mas rango
                    this.player.range = this.ExtrovertValue(this.player.baseRange);
                    this.player.damage = this.IntrovertValue(this.player.baseDamage);
                    //console.log(this.player.range);
                    //console.log(this.player.damage);
                    break;
               case 3: //dicotomia de  mostar mas o menos  cosas  en la  UI
                    
                    this.UI.GRP_BarraVida.setVisible(this.perDic3 <= 90);
                    this.UI.GRP_FuriaEureka.setVisible(this.perDic3 <= 80);
                    this.UI.GRP_Reloj.setVisible(this.perDic3 <= 70);
                    this.UI.GRP_Dust.setVisible(this.perDic3 <= 60);
                    this.UI.GRP_NextWave.setVisible(this.perDic3 <= 50);      
                    this.UI.GRP_DatosOleada.setVisible(this.perDic3 <= 40);
                    this.UI.GRP_Estadisticas.setVisible(this.perDic3 <= 30);
                    this.UI.GRP_Dicotomias.setVisible(this.perDic3 <= 20);
                    this.UI.map.setVisible(this.perDic3 <= 10);
                    
                    break;
          }
     }

     /* EXPLICACION DEL CALCULO APLICADO AL EMOTIONAL VALUE Y AL RATIONAL VALUE
          calculo para clampear los valores de la siguiente forma 
          si la dicotomia esta en 0, el valor sera un 20% del original
          si la dicotomia esta em 100, el valor sera un 80% del original
          es decir la dicotomia solo modifica el 60% entre esos margenes
     */
     //devuelve el porcentaje  de  rabia
     EmotionalValue() {
          return (0.2 + (0.6*((100 - this.perDic1)/100))) * this.rageBaseAmount;
     }
     //devuelve el  porcentaje  de eureka
     RationalValue() {
          return (0.2 + (0.6*(this.perDic1/100))) * this.eurekaBaseAmount;
     }


     /*   EXPLICACION DEL CALCULO APLICADO AL EMOTIONAL VALUE Y AL RATIONAL VALUE
          Se devuelve el valor base +- 50%
          si la dicotomia esta en 0, -50%
          si la dicotomia esta en 100, +50%
          si la dicotomia esta en 50, +0%, se queda igual

     */
     ExtrovertValue(baseRange) {
          return baseRange + baseRange * ((100 - this.perDic2) / 100 - 0.5);
     }
     IntrovertValue(baseDamage) {
          return baseDamage + baseDamage * (this.perDic2 / 100 - 0.5);
     }

     /*   EXPLICACION DEL NUMERO DE CARTAS A ELEGIR
          Hay 4 cartas a elegir + 1 , cada 25 puntos de la dicotomia
          Si la dicotomia es 0-24, 4 cartas
          Si la dicotomia es 25-49,5 cartas
          Si la dicotomia es 50-74,6 cartas
          Si la dicotomia es 75-99,7 cartas
          Si la dicotomia es 100, 8 cartas
     
     */
     getNCards() {
          return 1 + Math.trunc((this.perDic4 / 13));
     }


     /**
      * este método devuelve el valor de la carta
      * La suma de valores de todas las cartas dependerá del número de cartas que haya para elegir. 
      * de la siguiente manera:
      * - si tenemos oslamente una carta la suma de los valores será el 100% del valor.
      * - por cada carta extra la suma de los valores disminuirá un 5%.
      * -El valor de cada carta será el valor de la suma de los valores de las cartas dividido entre el número de cartas a pickear.
      * @param {string} key 
      * @returns 
      */
     CardValue(key) {
          return (this.player.scene.cardMap[key] * (1 - (0.05 * (this.getCardsToPick() -1))))/ this.getCardsToPick();
     }

     /**
      * Método para rellenar la deck cuando sacamos el menú de las dicotomías
      * @param {object} deck 
      */
     deckFill(deck) {
          //vacía el deck
          while (deck.length > 0){
               deck.pop();//popea mientras la longitud de la deck no sea 0
          }
               
          
          // relllena el mazo con n cartas aleatorias cada vez que entras en el dicotomy menu
          for (var i = 0; i < this.getNCards(); i++){
               deck.push(this.player.scene.statKeyList[Phaser.Math.Between(0, 6)]);
          }
     }

     /**
      * devuelve las cartas a coger cada vez que abres el menú
      */
     getCardsToPick(){
          return Math.trunc(1 + (this.perDic4 / 25));
     }
}