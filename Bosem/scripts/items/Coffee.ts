module Bosem {
    export class Coffee extends Item {
        constructor(game:Phaser.Game,x:number,y:number) {
            super(game, x, y, ResKeys.cofee);
        }
        
        static dropRate: number = 100;
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.moveSpeed += 100;
            holder.jumpSpeed += 100;
            holder.spriteBody.gravity.y += 50;
            
        }
    }
} 