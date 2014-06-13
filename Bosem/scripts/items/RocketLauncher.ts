module Bosem {
    export class RocketLauncher extends Item {
        static dropRate: number = 20;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.rocketLauncher);
        }
        init(holder: Player) {
            holder.lazerShooter.ammoType = Ammo.ROCKET;
        }
    }
} 