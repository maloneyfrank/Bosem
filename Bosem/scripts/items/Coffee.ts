module Bosem {
    export class Coffee extends Item {
        constructor(game:Phaser.Game,x:number,y:number) {
            super(game, x, y, ResKeys.cofee);
        }
        
        static dropRate: number = 100;
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.incrementMoveSpeed(100);
            holder.incrementJumpSpeed(100);
            holder.incrementGravity(50);
            
        }
    }
} 