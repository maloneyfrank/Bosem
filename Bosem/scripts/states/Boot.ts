module Bosem {
    export class Boot extends Phaser.State{
        preload() {

            this.load.image('preloadBar', 'assets/loader.png');

        }
        
        create() {
            this.game.state.start(ResKeys.preloaderState);

        }
    }
} 