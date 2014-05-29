module Bosem {
    export class Menu extends Phaser.State {
        preload() {
        }
        create() {
            this.game.state.start(ResKeys.battleState);

        }
    }
} 