var config = {
    type : Phaser.AUTO,
    width : 800,
    length : 600,
    pixelArt : true,
    scene : [{create:create, preload:preload}]
}
new Phaser.Game(config)

function create(){
    this.add.image(0, 0, "kirby").setOrigin(0,0).setScale(0.2, 0.2)
}

function preload(){
    this.load.image("kirby", "./img/kirby.png");
}
/*
init compartir informacion entre escenas
preload cargar recursos
create cargar la escena ¿que objetos tiene?
*/