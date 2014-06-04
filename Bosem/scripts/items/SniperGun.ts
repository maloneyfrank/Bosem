﻿module Bosem {
    export class SniperGun extends Item {
        static dropRate: number = 50;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.sniperGun);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Ammo.SNIPER_AMMO;
        }
    }
}
