module Bosem {
    export class Blink extends Item {
        static dropRate: number = 50;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.blink);
        }
        init(holder: Player) {
            super.init(holder);
            this.holder.useItem = this;
        }
        effect() {
            if (this.holder.jump.isDown)
                this.holder.y -= 500;
           else if (this.holder.facingLeft) {
                if (this.holder.x - 500 > this.game.camera.x)
                    this.holder.spriteBody.position.x -= 500;
                else
                    this.holder.spriteBody.position.x = this.game.camera.x + 1;
            } else {
            if (this.holder.x + 500 < this.game.camera.x + this.game.camera.width)
                this.holder.spriteBody.position.x += 500;
            else
                this.holder.spriteBody.position.x = this.game.camera.x + this.game.camera.width - this.holder.width - 1;
            }

            this.holder.useItem = null;
            this.destroy();
        }
    }
}
