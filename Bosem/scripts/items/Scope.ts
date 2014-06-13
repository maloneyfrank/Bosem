module Bosem {
    export class Scope extends Item {
        static dropRate: number = 100;
        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, ResKeys.scopeItem);
        }
        init(holder: Player) {
            super.init(holder);
            holder.incrementAttackSpeed(20);
            holder.incrementDamage(2);
            holder.incrementRange(30);

        }
    } 
} 