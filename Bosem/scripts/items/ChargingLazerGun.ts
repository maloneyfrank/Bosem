module Bosem {
    export class ChargingLazerGun extends Item {
        static dropRate: number = 40;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.chargingLazerGun);
        }
        init(holder: Player) {
            super.init(holder);
            holder.lazerShooter.ammoType = Ammo.CHARGING_LAZER;
        }
    }
} 