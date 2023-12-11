import Button from '../UI_Objects/Button.js'
export default class UI extends Phaser.Scene    
{
   
    constructor() {
        super({ key: 'UIScene', active: true });
    }
    //data transfer
    init() {

    }
    preload () {
            this.load.atlas('ui', 'srcJuego/ui/AtlasTexturas.png', 'srcJuego/ui/AtlasUI.json');
            this.load.image('heart', 'srcJuego/ui/Corazon.png');
            this.load.image('furiaEureka', 'srcJuego/ui/FuriaEureka2.png');
    }
    create() {

        this.player = this.scene.get('level').player;
        this.loadFont("JosefinBold", "srcJuego/fonts/JosefinSans-Bold.ttf");
        this.loadFont("JosefinMedium", "srcJuego/fonts/JosefinSans-Medium.ttf");

        // Creación de la barra de vida
        this.healthBG = this.add.nineslice(100, 900, 'ui', 'GreyBG', 500, 50, 10, 10, 10, 10);
        this.healthBar = this.add.nineslice(100, 900, 'ui', 'GreenBar', 500, 40, 10, 20, 20, 20);
        this.healthFrame = this.add.nineslice(100, 900, 'ui', 'GreyFrame', 500, 50, 10, 10, 10, 10);
        this.healthBG.setOrigin(0, 0.5);
        this.healthBar.setOrigin(0, 0.5);
        this.healthFrame.setOrigin(0, 0.5);

        this.add.image(90, 900, 'heart').setOrigin(0.5, 0.5).setScale(0.15, 0.15);

        this.healthInfo = this.add.text(590, 945, 'xxxx', { font: '25px JosefinBold', fill: 'black' });
        this.healthInfo.setOrigin(1, 0.5)


        // Creación de la barra de furiaEureka
        this.furiaBG = this.add.nineslice(330, 1000, 'ui', 'GreyBG', 265, 50, 10, 10, 10, 10);
        this.furiaBar = this.add.nineslice(330, 1000, 'ui', 'OrangeBar', 265, 40, 10, 20, 20, 20);
        this.furiaFrame = this.add.nineslice(330, 1000, 'ui', 'GreyFrame', 265, 50, 10, 10, 10, 10);

        this.furiaBG.setOrigin(0, 0.5);
        this.furiaBar.setOrigin(0, 0.5);
        this.furiaFrame.setOrigin(0, 0.5);

        this.eurekaBG = this.add.nineslice(330, 1000, 'ui', 'GreyBG', 265, 50, 10, 10, 10, 10);
        this.eurekaBar = this.add.nineslice(330, 1000, 'ui', 'BlueBar', 265, 40, 10, 20, 20, 20);
        this.eurekaFrame = this.add.nineslice(330, 1000, 'ui', 'GreyFrame', 265, 50, 10, 10, 10, 10);

        this.eurekaBG.setOrigin(1, 0.5);
        this.eurekaBar.setOrigin(1, 0.5);
        this.eurekaFrame.setOrigin(1, 0.5);

        this.add.image(330, 1000, 'furiaEureka').setOrigin(0.5, 0.5).setScale(1, 1);

        //this.healthFrame.setScale(10, 10);

        // this.tweens.add({
        //     targets: fill1,
        //     width: 800,
        //     duration: 3000,
        //     ease: 'sine.inout',
        //     yoyo: true,
        //     repeat: -1,
        // });

        //texto de crono
        this.text = this.add.text(800, 40,' ',{ font: '100px JosefinBold', fill: 'red' });
        this.secondsCount = 0;
        this.minuteCount = 0;
        //datos de la oleada (por rellenar y gestionar actualizacion)
        this.waveData = this.add.text(100, 40,'Wave: '+ 1,{ font: '70px JosefinMedium', fill: 'blue' });
        
        //texto de estadisticas
        this.statsText = 
        'Life: '+this.player.maxLife+'\n'+'\n'+
        'Life Reg.: '+'\n'+'\n'+
        'Damage: '+this.player.damage+'\n'+'\n'+
        'Melee Arm.: '+ this.player._meleeArmor+'\n'+'\n'+
        'Range Arm.: '+ this.player._rangeArmor+'\n'+'\n'+
        'Range: '+this.player.range+'\n'+'\n'+
        'Speed: '+this.player.speed;
        this.stats = this.add.text(this.sys.game.canvas.width - 20, this.sys.game.canvas.height / 2, this.statsText, 
            { font: '50px JosefinMedium', fill: 'white', align: 'right'}).setOrigin(1,0.5);

        this.dust = this.add.text(this.sys.game.canvas.width - 20, this.sys.game.canvas.height - 70,'Dust: ', 
        { font: '50px JosefinMedium', fill: 'green', align: 'right'}).setOrigin(1,0.5);
    }
    update(t,dt) {
        const ourGame = this.scene.get('level');
        


        if(ourGame.player != undefined){
            this.healthInfo.setText(Phaser.Math.RoundTo(ourGame.player.health, 0) + ' / ' + Phaser.Math.RoundTo(ourGame.player.maxLife, 0));

            this.healthBar.width = ourGame.player.health/ourGame.player.maxLife * 500;

            this.furiaBar.width = ourGame.player.rage/ourGame.player.rageMax * 265 + 50
            this.eurekaBar.width = ourGame.player._eureka/ourGame.player.eurekaMax * 265 + 50
        }
       this.timerUpdate(dt);
       this.updateStats();
       this.dust.setText('Dust: ' + this.player.dust);
    }

    loadFont(name, url) {
		let self = this;
	    let newFont = new FontFace(name, `url(${url})`);
	    newFont.load()
	    // Función que se llamará cuando las fuentes estén cargadas
	    // en este caso, load devuelve lo que llamamos una promesa
	    // más info en: https://developer.mozilla.org/en-US/docs/Web/API/FontFace/load
	    .then(function (loaded) { 
	        document.fonts.add(loaded);
	        self.continueCreate();
	    }).catch(function (error) {
	        return error;
    	});
	}
    /**
     * actualiza el temporizador de tiempo general de juego
     * @param {number} dt delta time de la escena 
     */
    timerUpdate(dt){
        //set timer UI
		this.secondsCount += dt/1000;
		if(this.secondsCount > 60){
            this.minuteCount++;
			this.secondsCount = 0;
		}	
        this.text.setText (this.minuteCount.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })+ ':' +this.secondsCount.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
            maximumFractionDigits:0 
          })) ;
    }
    updateStats(){
        this.statsText = 
        'Life: '+this.player.maxLife+'\n'+'\n'+
        'Life Reg.: '+'\n'+'\n'+
        'Damage: '+this.player.damage+'\n'+'\n'+
        'Melee Arm.: '+ this.player._meleeArmor+'\n'+'\n'+
        'Range Arm.: '+ this.player._rangeArmor+'\n'+'\n'+
        'Range: '+this.player.range+'\n'+'\n'+
        'Speed: '+this.player.speed;
        this.stats.setText(this.statsText);
    }

}