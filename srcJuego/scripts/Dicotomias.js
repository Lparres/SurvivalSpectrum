export default class Dicotomías
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    perDic es el porcentaje (percentage) de cada dicotomía
    */
   //Realmente se puede hacer tremendo constructor vacío y tirando
   /**
    * 
    * @param {*} perDic1 Valor del emocional
    * @param {*} perDic2 Valor del extrovertido
    * @param {*} perDic3 
    * @param {*} perDic4 
    */
   constructor(player,perDic1,perDic2,perDic3,perDic4)
   {
        this.player = player;
        this.perDic1=perDic1;
        this.perDic2=perDic2;
        this.perDic3=perDic3;
        this.perDic4=perDic4;
   }

   //métodos
   //método que sube un porcentage a una dicotomía
   SubeDic = function(dic, plusPer)
   {
    //método vacío
   }

   /**
    * 
    * @param {number} type // quiero el primer valor o el segundo
    * @returns {number} devuelve la interpertacion según el porcentaje de la dicotomía dic y el extremo de type
    */
   TakeGeometricNumber(type, dicx)
   {
     let dic = this.getDic(dicx);
     //rage
     if(type == 1){
          return dic/100;
     }
     //eureka
     else{
          return 1 - (dic/100);
     }
   }
/**
 * 
 * @param {number} dic numero de dicotomia
 * @returns {number} porcentaje sin calcular de la dicotomia
 */
   getDic(dic){
          switch(dic){
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
   dicName(dic){
     switch(dic){
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
   AplieDicotomy(dic){
     switch(dic){
          case 1:
               this.player.rageMax = this.EmotionalValue();
               //this.player.eurekaMax = this.RationalValue();
               this.player.eurekaMax =1000;
               break;
          case 2:
               this.player.range = this.ExtrovertValue(this.player.baseRange);
               this.player.damage = this.IntrovertValue(this.player.baseDamage);
               break;
          case 4:   
               //this.getNCards();
               this.player.scene.cardList.life += this.CardValue();
               this.player.scene.cardList.lifeRegen += this.CardValue();
               this.player.scene.cardList.damage += this.CardValue();
               this.player.scene.cardList.fireRate += this.CardValue();
               this.player.scene.cardList.meleeArmor += this.CardValue();
               this.player.scene.cardList.rangeArmor += this.CardValue();
               this.player.scene.cardList.speed += this.CardValue();
               console.log(this.player.scene.cardList);
     }
   }

   EmotionalValue(){
     return this.perDic1;
   }
   RationalValue(){
     return (100 - this.perDic1);
   }

   ExtrovertValue(baseRange){
     return baseRange + baseRange*(this.perDic2/100-0.5);
   }
   IntrovertValue(baseDamage){
     return baseDamage + baseDamage*((100-this.perDic2)/100-0.5);
   }

   getNCards(){
     return 4 + Math.round((this.perDic4/25));
   }

   CardValue(){
     return this.perDic4;
   }

   /**
    * Método para rellenar la deck cuando sacamos el menú de las dicotomías
    * @param {object} deck 
    */
   deckFill(deck){
     while(deck.length > 0)
          deck.pop(); 
     
     for( var i = 0;i < this.getNCards();i++)
          deck.push(this.player.scene.statKeyList[Phaser.Math.Between(0,  6)])
   }
}