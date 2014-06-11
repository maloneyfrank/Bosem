module Bosem {
    export class BoomerangGun extends Item {
        static dropRate: number = 40;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.boomerangGun);
        }
        init(holder: Player) {
            holder.lazerShooter.ammoType = Ammo.BOOMERANG_AMMO;
        }
    }
} 