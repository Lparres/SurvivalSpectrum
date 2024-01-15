import Bar from "../UI_Objects/FillableBar.js";
/**
 * Zona donde se encuentra la informacion de la vida del jugador
 * Se compone de una barra, un sprite y texto
 */
export default class HealthBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)

        let spritesHealthBar = {
            background: "GreyBG",
            fill: "GreenBar",
            frame: "BlackFrame",
        }
        let sizeHealthBar = {
            width: 500,
            heith: 50
        }
        //icono del corazon
        this.heartIcon = scene.add.image(0, 0, 'heart').setOrigin(0.5, 0.5).setScale(0.15, 0.15);
        //barra de vida
        this.bar = new Bar(scene, 10, 0, 400, spritesHealthBar, sizeHealthBar);
        //forma textual de la vida
        this.healthInfo = scene.add.text(sizeHealthBar.width, 45, 'xxxx', { font: '25px JosefinBold', fill: 'black' }).setOrigin(1, 0.5);

        this.add([this.bar, this.healthInfo, this.heartIcon])

        scene.add.existing(this)
    }

    preUpdate(t, dt) { }

    setValues(value, maxValue) {
        this.bar.setValue(value);
        this.bar.setMaxValue(maxValue);

        this.healthInfo.setText((value <= 0 ? 0 : Phaser.Math.RoundTo(value, 0)) + ' / ' + Phaser.Math.RoundTo(maxValue, 0));
    }
}