module Bosem {
    export class Coffee extends Item {
        constructor(game:Phaser.Game,x:number,y:number) {
            super(game, x, y, ResKeys.cofee);
        }
        
        static dropRate: number = 100;
        init(holder: Player) {
            super.init(holder);
            holder.incrementMoveSpeed(100);
            holder.incrementJumpSpeed(100);
            holder.incrementGravity(50);
            
        }
    }
} 