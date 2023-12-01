export default class Dicotomías
{
    /*
    *Las variable con barra baja son las de la clase, si barra baja son las variables de la sobrecarga
    perDic es el porcentaje (percentage) de cada dicotomía
    */
   //Realmente se puede hacer tremendo constructor vacío y tirando
   /**
    * 
    * @param {*} perDic1 
    * @param {*} perDic2 
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
    */
   TakeGeometricNumber(type)
   {
     if(type == 1){
          return this.perDic1/100;
     }
     else{
          return 1 - (this.perDic1/100);
     }
   }


   /**
    * 
    * @param {number} per porcentaje de la dicotomía
    */
   RangeDic(per){
        
   }
}