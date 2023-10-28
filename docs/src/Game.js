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
    scene : [{create:create, preload:preload}],
    canvas: document.getElementById("game")
}
    var game = new Phaser.Game(config)

function create(){
    this.add.image(0, 0, "kirby").setOrigin(0,0).setScale(0.2, 0.2)
}

function preload(){
    this.load.image("kirby", "./img/kirby.png");
}
/*
init() compartir informacion entre escenas
preload() cargar recursos
create() cargar la escena ¿que objetos tiene? se instancian los gameObject
update() 
*/