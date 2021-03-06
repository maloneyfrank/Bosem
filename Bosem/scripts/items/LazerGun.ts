﻿module Bosem {
    export class LazerGun extends Item {
        static dropRate: number = 80;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.lazerGun);
        }
        init(holder: Player) {
            super.init(holder);
            holder.lazerShooter.ammoType = Ammo.BASIC_AMMO;
        }
    }
}
