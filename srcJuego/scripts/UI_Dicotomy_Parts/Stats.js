/**
 * Contenedor para el bloque de estadisticas
 */
export default class Stats extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
      super(scene, x, y)
      this.estadisticasImg = scene.add.image(0, 0, 'estadisticasOpaco').setOrigin(1, 0.5).setScale(1, 1);
      this.add(this.estadisticasImg);
  
      const textFontConfig = { font: '30px JosefinMedium', fill: '#424242' };
  
      this.lifeInfo = scene.add.text(-20, -200, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.lifeRegenInfo = scene.add.text(-20, -138, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.damageInfo = scene.add.text(-20, -76, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.fireRateInfo = scene.add.text(-20, -14, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.meleeArmorInfo = scene.add.text(-20, 48, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.rangeArmorInfo = scene.add.text(-20, 110, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.rangeInfo = scene.add.text(-20, 172, 'xxxx', textFontConfig).setOrigin(1, 0.5);
      this.speedInfo = scene.add.text(-20, 234, 'xxxx', textFontConfig).setOrigin(1, 0.5);
  
      this.add([this.lifeInfo, this.lifeRegenInfo,
      this.damageInfo, this.fireRateInfo,
      this.meleeArmorInfo, this.rangeArmorInfo,
      this.rangeInfo, this.speedInfo]);
  
      this.scene.add.existing(this);
      this.textConfig = {
        minimumIntegerDigits: 1,
        useGrouping: false,
        maximumFractionDigits: 2
      }
    }
    preUpdate(t, dt) {
      this.updateStats(this.scene.player);
    }
    /**
     * Actualiza las UI de estadisticas en funcion del player pasado
     * @param {Player} player 
     */
    updateStats(player){
        this.lifeInfo.setText((player.maxLife).toLocaleString('en-US', this.textConfig));
        this.lifeRegenInfo.setText((player.lifeReg).toLocaleString('en-US', this.textConfig));
        this.damageInfo.setText((Phaser.Math.RoundTo(player.damage, -3)).toLocaleString('en-US', this.textConfig));
        this.fireRateInfo.setText((player._atkCD / 1000).toLocaleString('en-US', this.textConfig));
        this.meleeArmorInfo.setText((Phaser.Math.RoundTo(player._meleeArmor)).toLocaleString('en-US', this.textConfig));
        this.rangeArmorInfo.setText((Phaser.Math.RoundTo(player._rangeArmor)).toLocaleString('en-US', this.textConfig));
        this.rangeInfo.setText((Phaser.Math.RoundTo(player.range)).toLocaleString('en-US', this.textConfig));
        this.speedInfo.setText((Phaser.Math.RoundTo(player.speed)).toLocaleString('en-US', this.textConfig));
    }
  }