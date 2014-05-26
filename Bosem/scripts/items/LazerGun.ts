module Bosem {
    export class LazerGun extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.lazerGun);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.ammoType = Ammo.BASIC_AMMO;
        }
    }
}
