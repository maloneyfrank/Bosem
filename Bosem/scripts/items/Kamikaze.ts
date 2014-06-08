module Bosem {
    export class Kamikaze extends Item {
        static dropRate: number = 80;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.kamikaze);
        }
        init(holder: Player) {
            super.init(holder);
            this.holder.useItem = this;
        }
        effect() {
            for (var i = 0; i < KillableInGame.players.length; i++) {
                KillableInGame.killPlayer(KillableInGame.players[i]);
            }
            this.holder.useItem =null;
            this.destroy();
        }
    }
} 