module Bosem {
    export class Banana extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.bananaItem);
        }
        facingLeft: boolean;

        init(holder:Player) {
            super.init(holder);
            this.facingLeft = holder.facingLeft;
            holder.effectItems.push(this);
            this.game.time.events.add(250, this.removeFromEffect, this);
            holder.spriteBody.velocity.x = 0;
        }
        removeFromEffect() {
            var index: number = this.holder.effectItems.indexOf(this);
            this.holder.effectItems.splice(index, 1);
        }
        itemUpdate() {
            if (this.facingLeft) {
                this.holder.spriteBody.velocity.x = -1500;
            } else
                this.holder.spriteBody.velocity.x = 1500;
        }

    }
} 