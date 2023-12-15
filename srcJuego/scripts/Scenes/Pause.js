
import Button from "../UI_Objects/Button.js"


export default class MainScene extends Phaser.Scene{
    constructor(){
        super({key: "Pause"});
    }

    create(){
        
        this.close = new Button(this,500,500,'map',1, ()=>
        {
            let UI = this.scene.get('UIScene');
            let MainScene = this.scene.get('level');
            this.scene.wake('UIScene');
            this.scene.sleep('Pause');
            MainScene.scene.setActive(true);
            MainScene.music.resume();
        })

        console.log("tu vieja");
    }
}