import StartMenu from './Scenes/StartMenu.js'
import BootScene from './Scenes/BootScene.js'
import MainLevel from './Scenes/Scene.js'
import UI from './Scenes/UI.js'
import Menu from './Scenes/DicotomyMenu.js'
import Pause from './Scenes/Pause.js'
import FinalScene from './Scenes/FinalScene.js'
var config = {
    type : Phaser.AUTO,
    parent: "juego",
    scale : {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
        autoCenter: Phaser.Scale.NO_CENTER,

    },
    pixelArt : true,
    scene : [BootScene,StartMenu,,MainLevel, UI,Menu,Pause,FinalScene],
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            debug: true// true para ver info
        }
    }
}
    var game = new Phaser.Game(config)



/*
init() compartir informacion entre escenas
preload() cargar recursos
create() cargar la escena ¿que objetos tiene? se instancian los gameObject
update() 
*/