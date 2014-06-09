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
            if (this.holder.facingLeft) {
                this.holder.spriteBody.position.x -= 500;
            } else {
                this.holder.spriteBody.position.x += 500;
            }

            this.holder.useItem = null;
            this.destroy();
        }
    }
}
