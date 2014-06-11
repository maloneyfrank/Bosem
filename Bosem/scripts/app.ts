///<reference path="res/phaser.d.ts" />
module Bosem
{
    class Game extends Phaser.Game {
        constructor() {
            super(1024, 768, Phaser.AUTO, 'content');
            this.state.add(ResKeys.bootState, Boot);
            this.state.add(ResKeys.menuState, Menu);
            this.state.add(ResKeys.battleState, Battle);
            this.state.add(ResKeys.preloaderState, Preloader);
            this.state.add(ResKeys.endGameState, EndGame);
            this.state.start(ResKeys.bootState);
            
        }

    }

    window.onload = function () {
     var game = new Game();
    }
}