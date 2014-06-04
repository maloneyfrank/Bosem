module Bosem {
    export class Radar extends Item{
        static dropRate: number = 30;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.radar);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Ammo.HOMING_MISSLE;
        } 
    }
} 