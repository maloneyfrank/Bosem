module Bosem {
    export class ChargingLazerGun extends Item {
        static dropRate: number = 40;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.chargingLazerGun);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Ammo.CHARGING_LAZER;
        }
    }
} 