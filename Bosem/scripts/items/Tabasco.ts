module Bosem {
    export class Tabasco extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.tabasco);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.ammoType = Ammo.FLAME_AMMO;
        }
    }
} 