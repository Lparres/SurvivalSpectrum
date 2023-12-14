import Button from '../UI_Objects/Button.js'
//Va a ser necesario organizar la ui con containers para la dicotomía que la oculta para
//que sea mas sencillo de hacer

export default class UI extends Phaser.Scene    
{
   
    constructor() {
        super({ key: 'UIScene'});

    }
    //data transfer
    init() {

    }
    preload () {

    }
    create() {
        this.mainScene = this.scene.get('level');
        this.player = this.mainScene.player;


        this.loadFont("JosefinBold", "srcJuego/fonts/JosefinSans-Bold.ttf");
        this.loadFont("JosefinMedium", "srcJuego/fonts/JosefinSans-Medium.ttf");

        // Creación de la barra de vida
        this.healthBG = this.add.nineslice(100, 900, 'ui', 'GreyBG', 500, 50, 10, 10, 10, 10);
        this.healthBar = this.add.nineslice(100, 900, 'ui', 'GreenBar', 500, 40, 10, 20, 20, 20);
        this.healthFrame = this.add.nineslice(100, 900, 'ui', 'BlackFrame', 500, 50, 10, 10, 10, 10);
        this.healthBG.setOrigin(0, 0.5);
        this.healthBar.setOrigin(0, 0.5);
        this.healthFrame.setOrigin(0, 0.5);

        this.add.image(90, 900, 'heart').setOrigin(0.5, 0.5).setScale(0.15, 0.15);

        this.healthInfo = this.add.text(590, 945, 'xxxx', { font: '25px JosefinBold', fill: 'black' });
        this.healthInfo.setOrigin(1, 0.5)


        // Creación de la barra de furiaEureka
        this.furiaBG = this.add.nineslice(330, 1000, 'ui', 'GreyBG', 265, 50, 10, 10, 10, 10);
        this.furiaBar = this.add.nineslice(330, 1000, 'ui', 'OrangeBar', 265, 40, 10, 20, 20, 20);
        this.furiaFrame = this.add.nineslice(330, 1000, 'ui', 'BlackFrame', 265, 50, 10, 10, 10, 10);
        this.furiaBG.setOrigin(0, 0.5);
        this.furiaBar.setOrigin(0, 0.5);
        this.furiaFrame.setOrigin(0, 0.5);

        this.eurekaBG = this.add.nineslice(330, 1000, 'ui', 'GreyBG', 265, 50, 10, 10, 10, 10);
        this.eurekaBar = this.add.nineslice(330, 1000, 'ui', 'BlueBar', 265, 40, 10, 20, 20, 20);
        this.eurekaFrame = this.add.nineslice(330, 1000, 'ui', 'BlackFrame', 265, 50, 10, 10, 10, 10);
        this.eurekaBG.setOrigin(1, 0.5);
        this.eurekaBar.setOrigin(1, 0.5);
        this.eurekaFrame.setOrigin(1, 0.5);

        this.add.image(330, 1000, 'furiaEureka').setOrigin(0.5, 0.5).setScale(1, 1);


        // Creación estadísticas
        this.estadisticasImg = this.add.image(1880, 360, 'estadisticas').setOrigin(1, 0).setScale(1, 1);

        this.lifeInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 78, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.lifeRegenInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 140, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.damageInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 202, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.fireRateInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 263, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.meleeArmorInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 322, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeArmorInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 385, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 448, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.speedInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 507, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);

        //texto de crono
        this.marcoReloj = this.add.image(960, 50, 'marcoReloj').setOrigin(0.5, 0.5).setScale(1.5,1.5);
        this.timeText = this.add.text(this.marcoReloj.x, this.marcoReloj.y + 4,' ',{ font: '60px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5);
        this.secondsCount = 0;
        this.minuteCount = 0;

        //datos de la oleada (por rellenar y gestionar actualizacion)
        this.waveData = this.add.image(150, 190, 'waveInfo').setOrigin(0.5, 0.5).setScale(1, 1);
        this.waveN = this.add.text(this.waveData.x, this.waveData.y - 78,'xxxx',{ font: '40px JosefinMedium', fill: '#424242'}).setOrigin(0.5, 0.5);
        this.enemiesN = this.add.text(this.waveData.x, this.waveData.y + 35,'123',{ font: '33px JosefinMedium', fill: '#424242' }).setOrigin(0.5, 0.5);

        //el momento en el que saldrá la siguiente oleada
        this.nextWaveIMG = this.add.image(150, 450, 'nextWave').setOrigin(0.5, 0.5).setScale(1, 1);

        this.nextWave = this.add.text(this.nextWaveIMG.x, this.nextWaveIMG.y + 24,'xxxx',{ font: '35px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5);    

        
        // Creación indicador dust
        this.dust = this.add.text(1730, 1000,'xxxx', 
        { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(1,0.5);
    
        this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        

        // Creación del mapa
        this.map = this.add.image(1730, 180, 'map').setOrigin(0.5, 0.5).setScale(0.6, 0.6);


        this.updateWaveData();
        
    }
    update(t,dt) {
        
        const ourGame = this.scene.get('level');


        if(ourGame.player != undefined){
            this.healthInfo.setText(Phaser.Math.RoundTo(ourGame.player.health, 0) + ' / ' + Phaser.Math.RoundTo(ourGame.player.maxLife, 0));

            this.healthBar.width = ourGame.player.health/ourGame.player.maxLife * 500;

            if(ourGame.player.rageMode){
                this.furiaBar.width = (ourGame.player.dicTotalTime - ourGame.player.dicTime)/ourGame.player.dicTotalTime * 215 + 50
            }else{
                this.furiaBar.width = ourGame.player.rage/ourGame.player.rageMax * 215 + 50
            }
            if(ourGame.player.eurekaMode){
                
                this.eurekaBar.width = (ourGame.player.dicTotalTime - ourGame.player.dicTime)/ourGame.player.dicTotalTime * 215 + 50
            }else{
                this.eurekaBar.width = ourGame.player._eureka/ourGame.player.eurekaMax * 215 + 50
            }
            
        }
       this.timerUpdate(dt);
       this.updateStats();

       this.dust.setText(this.player.dust);

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
		if(this.secondsCount >= 60){
            this.minuteCount++;
			this.secondsCount = 0;
		}	
        this.timeText.setText ((this.secondsCount <59.5 ? this.minuteCount : this.minuteCount+1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })+ ':' +(this.secondsCount <59.5 ? this.secondsCount : 0).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
            maximumFractionDigits:0 
          })) ;
    }
    updateStats(){
        this.lifeInfo.setText(this.player.maxLife);
        this.lifeRegenInfo.setText("xxxx");
        this.damageInfo.setText(this.player.damage);
        this.fireRateInfo.setText("xxxx");
        this.meleeArmorInfo.setText(this.player._meleeArmor);
        this.rangeArmorInfo.setText(this.player._rangeArmor);
        this.rangeInfo.setText(this.player.range);
        this.speedInfo.setText(this.player.speed);
    }

    //update de la info de oleadas, revisar pls
    updateWaveData() {

        //actualizar el numero de oleada
        this.waveN.setText(this.mainScene.currentWave+1);
        
        //actualizar el timer de la proxima oleada
        this.nextWave.setText(Math.floor(this.mainScene.waveJson.NewWaves[this.mainScene.currentWave +1].waveStartTime / 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
            maximumFractionDigits:0
        })+ ':' +(this.mainScene.waveJson.NewWaves[this.mainScene.currentWave +1].waveStartTime % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
            maximumFractionDigits:0 
        })) ;
        

        //calculo de los enemigos de esta oleada
        let nEnemies = 0;
        for(let i = 0; i< this.mainScene.waveJson.NewWaves[this.mainScene.currentWave].spawnsData.length;i++){
            nEnemies += this.mainScene.waveJson.NewWaves[this.mainScene.currentWave].spawnsData[i].size;
        }

        this.enemiesN.setText(nEnemies);

    }
    
}