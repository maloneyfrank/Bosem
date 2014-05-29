module Bosem {
    export class Kamikaze extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.kamikaze);
        }
        init(holder: Player) {
            var players:Player[] = KillableInGame.getPlayers();
            for (var i = 0; i < players.length; i++) {
                KillableInGame.killPlayer(players[i]);
            }
        }
    }
} 