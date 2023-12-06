import MainLevel from './Scenes/Scene.js'
import UI from './Scenes/UI.js'
var config = {
    type : Phaser.AUTO,
    parent: "juego",
    scale : {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALY,

    },
    pixelArt : true,
    scene : [MainLevel, UI],
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            debug: true // true para ver info
        }
    },
    canvas: document.getElementById("game")
}
    var game = new Phaser.Game(config)



/*
init() compartir informacion entre escenas
preload() cargar recursos
create() cargar la escena ¿que objetos tiene? se instancian los gameObject
update() 
*/