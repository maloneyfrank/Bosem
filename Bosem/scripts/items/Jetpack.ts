module Bosem {
    export class Jetpack extends Item {
        static dropRate: number = 70;
        timeNotCalled: boolean = true;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.jetpack);
        }
        init(holder: Player) {
            super.init(holder);
            this.holder.useItem = this;
        }
        effect() {
            this.holder.spriteBody.velocity.y -= 30;

            this.game.time.events.add(6000, this.killJetPack, this);
        }

        killJetPack() {
            this.holder.useItem = null;
            this.destroy();

        }
    }
}
