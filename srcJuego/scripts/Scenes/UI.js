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
        this.GRP_BarraVida = this.add.group();

        this.healthBG = this.add.nineslice(100, 900, 'ui', 'GreyBG', 500, 50, 10, 10, 10, 10);
        this.healthBar = this.add.nineslice(100, 900, 'ui', 'GreenBar', 500, 40, 10, 20, 20, 20);
        this.healthFrame = this.add.nineslice(100, 900, 'ui', 'BlackFrame', 500, 50, 10, 10, 10, 10);
        this.healthBG.setOrigin(0, 0.5);
        this.healthBar.setOrigin(0, 0.5);
        this.healthFrame.setOrigin(0, 0.5);

        this.heartIMG = this.add.image(90, 900, 'heart').setOrigin(0.5, 0.5).setScale(0.15, 0.15);

        this.healthInfo = this.add.text(590, 945, 'xxxx', { font: '25px JosefinBold', fill: 'black' });
        this.healthInfo.setOrigin(1, 0.5)

        this.GRP_BarraVida.addMultiple([this.healthBG, this.healthBar, this.healthFrame, this.heartIMG, this.healthInfo]);


        // Creación de la barra de furiaEureka
        this.GRP_FuriaEureka = this.add.group();

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

        this.furiaEurekaIMG = this.add.image(330, 1000, 'furiaEureka').setOrigin(0.5, 0.5).setScale(1, 1);

        this.GRP_FuriaEureka.addMultiple([this.furiaBG, this.furiaBar, this.furiaFrame, this.eurekaBG, this.eurekaBar, this.eurekaFrame, this.furiaEurekaIMG]);


        // Creación estadísticas
        this.GRP_Estadisticas = this.add.group();

        this.estadisticasImg = this.add.image(1880, 360, 'estadisticas').setOrigin(1, 0).setScale(1, 1);

        this.lifeInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 78, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.lifeRegenInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 140, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.damageInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 202, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.fireRateInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 263, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.meleeArmorInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 322, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeArmorInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 385, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.rangeInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 448, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);
        this.speedInfo = this.add.text(this.estadisticasImg.x - 20, this.estadisticasImg.y + 507, 'xxxx', { font: '30px JosefinMedium', fill: '#424242' }).setOrigin(1, 0.5);

        this.GRP_Estadisticas.addMultiple([this.estadisticasImg, this.lifeInfo, this.lifeRegenInfo, this.damageInfo, this.fireRateInfo, this.meleeArmorInfo, this.rangeArmorInfo, this.rangeInfo, this.speedInfo]);


        //texto de crono
        this.GRP_Reloj = this.add.group();
        this.marcoReloj = this.add.image(960, 50, 'marcoReloj').setOrigin(0.5, 0.5).setScale(1.5,1.5);
        this.timeText = this.add.text(this.marcoReloj.x, this.marcoReloj.y + 4,' ',{ font: '60px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5);
        this.secondsCount = 0;
        this.minuteCount = 0;
        this.GRP_Reloj.addMultiple([this.marcoReloj, this.timeText]);


        //datos de la oleada (por rellenar y gestionar actualizacion)
        this.GRP_DatosOleada = this.add.group();
        this.waveData = this.add.image(150, 190, 'waveInfo').setOrigin(0.5, 0.5).setScale(1, 1);
        this.waveN = this.add.text(this.waveData.x, this.waveData.y - 78,'xxxx',{ font: '40px JosefinMedium', fill: '#424242'}).setOrigin(0.5, 0.5);
        this.enemiesN = this.add.text(this.waveData.x, this.waveData.y + 35,'123',{ font: '33px JosefinMedium', fill: '#424242' }).setOrigin(0.5, 0.5);
        this.GRP_DatosOleada.addMultiple([this.waveData, this.waveN, this.enemiesN]);


        //indicador de tiempo para la siguiente oleada
        this.GRP_NextWave = this.add.group();
        this.nextWaveIMG = this.add.image(150, 450, 'nextWave').setOrigin(0.5, 0.5).setScale(1, 1);
        this.nextWave = this.add.text(this.nextWaveIMG.x, this.nextWaveIMG.y + 24,'xxxx',{ font: '35px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5);    
        this.GRP_NextWave.addMultiple([this.nextWaveIMG, this.nextWave]);
        

        // Creación indicador dust
        this.GRP_Dust = this.add.group();
        this.dust = this.add.text(1730, 1000,'xxxx', 
        { font: '50px JosefinMedium', fill: 'white', align: 'right', stroke: 'black', strokeThickness: 5}).setOrigin(1,0.5);
        this.dustIMG = this.add.image(1860 , 1000, 'polvos').setScale(0.1).setOrigin(1,0.5);
        this.GRP_Dust.addMultiple([this.dust, this.dustIMG]);

        // Creación del mapa
        this.map = this.add.image(1730, 180, 'map').setOrigin(0.5, 0.5).setScale(0.6, 0.6);



        // Creación de las dicotomías
        this.GRP_Dicotomias = this.add.group();

        this.GRP_Dicotomias.add(this.add.image(1100, 929, 'fondoDicotomias').setOrigin(0.5, 0.5));

        this.GRP_Dicotomias.add(this.add.image(800, 950, 'marcoDialBG').setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dicValText1 = this.add.text(800, 990,  this.mainScene.dicotomyManager.dicName(1) + ' ' + this.mainScene.dicotomyManager.getDic(1), { font: '30px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dial1 = this.add.rectangle(800, 950, 5,25, 0xff0000).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.add.image(800, 950, 'marcoDialFrame').setOrigin(0.5, 0.5));

        this.GRP_Dicotomias.add(this.add.image(1000, 950, 'marcoDialBG').setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dicValText2 = this.add.text(1000, 990,  this.mainScene.dicotomyManager.dicName(2) + ' ' + this.mainScene.dicotomyManager.getDic(2), { font: '30px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dial2 = this.add.rectangle(1000, 950, 5,25, 0xff0000).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.add.image(1000, 950, 'marcoDialFrame').setOrigin(0.5, 0.5));

        this.GRP_Dicotomias.add(this.add.image(1200, 950, 'marcoDialBG').setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dicValText3 = this.add.text(1200, 990,  this.mainScene.dicotomyManager.dicName(3) + ' ' + this.mainScene.dicotomyManager.getDic(3), { font: '30px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dial3 = this.add.rectangle(1200, 950, 5,25, 0xff0000).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.add.image(1200, 950, 'marcoDialFrame').setOrigin(0.5, 0.5));

        this.GRP_Dicotomias.add(this.add.image(1400, 950, 'marcoDialBG').setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.dial4 = this.dicValText4 = this.add.text(1400, 990,  this.mainScene.dicotomyManager.dicName(4) + ' ' + this.mainScene.dicotomyManager.getDic(4), { font: '30px JosefinMedium', fill: 'white' }).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.add.rectangle(1400, 950, 5,25, 0xff0000).setOrigin(0.5, 0.5));
        this.GRP_Dicotomias.add(this.add.image(1400, 950, 'marcoDialFrame').setOrigin(0.5, 0.5));
        

        this.updateWaveData();

        
    }
    update(t,dt) {
        
        const ourGame = this.scene.get('level');
        //console.log("UI created");

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

       this.updateDicotomias();

       this.dust.setText(this.player.dust);


       // Se modifica la cantidad de elementos del HUD según la dicotomía.
       this.setVisibilidadHUD(ourGame);

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

    updateDicotomias(){
        this.dicValText1.setText(this.mainScene.dicotomyManager.dicName(1) + ' ' + this.mainScene.dicotomyManager.getDic(1));
        this.dicValText2.setText(this.mainScene.dicotomyManager.dicName(2) + ' ' + this.mainScene.dicotomyManager.getDic(2));
        this.dicValText3.setText(this.mainScene.dicotomyManager.dicName(3) + ' ' + this.mainScene.dicotomyManager.getDic(3));
        this.dicValText4.setText(this.mainScene.dicotomyManager.dicName(4) + ' ' + this.mainScene.dicotomyManager.getDic(4));

        this.dial1.x = this.dicValText1.x-75 + this.mainScene.dicotomyManager.getDic(1) * 150/100;
        this.dial2.x = this.dicValText2.x-75 + this.mainScene.dicotomyManager.getDic(2) * 150/100;
        this.dial3.x = this.dicValText3.x-75 + this.mainScene.dicotomyManager.getDic(3) * 150/100;
        this.dial4.x = this.dicValText4.x-75 + this.mainScene.dicotomyManager.getDic(4) * 150/100;

    }

    setVisibilidadHUD(mainScene){
        let uiDicotomy = mainScene.dicotomyManager.getDic(3);

        this.GRP_BarraVida.setVisible(uiDicotomy > 40);
        this.GRP_FuriaEureka.setVisible(uiDicotomy > 41);
        this.GRP_Estadisticas.setVisible(uiDicotomy > 42);
        this.GRP_Reloj.setVisible(uiDicotomy > 43);
        this.GRP_DatosOleada.setVisible(uiDicotomy > 44);
        this.GRP_NextWave.setVisible(uiDicotomy > 45);
        this.GRP_Dust.setVisible(uiDicotomy > 46);
        this.map.setVisible(uiDicotomy > 47);
        this.GRP_Dicotomias.setVisible(uiDicotomy > 48);


        }
    
}