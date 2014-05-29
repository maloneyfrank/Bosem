module Bosem {
    export class Kamikaze extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.kamikaze);
        }
        init(holder: Player) {
            holder.canDie = false;
            holder.enemy.canDie = false;
            holder.livesEditable = true;
            holder.enemy.livesEditable = true;
            holder.heldItems.push(this);

            var players:Player[] = KillableInGame.getPlayers();
            for (var i = 0; i < players.length; i++) {
                KillableInGame.killPlayer(players[i]);
            }
        }
    }
} 