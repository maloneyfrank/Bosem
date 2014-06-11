module Bosem {
    export class Tabasco extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.tabasco);
        }
        init(holder: Player) {
            super.init(holder);
          //  holder.lazerShooter.ammoType = Ammo.FLAME_AMMO;
        }
    }
} 