module Bosem {
    export class Bomb extends Item {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.bombItem);
        }
        bomb: Phaser.Image;
        init(holder:Player) {
            super.init(holder);
            holder.useItem = this;

        }
        effect() {
            this.bomb = this.game.add.image(this.holder.x, this.holder.y, ResKeys.bombItem);
            this.game.time.events.add(3000, this.explode, this);
            this.holder.useItem = null;
        }
        explode() {

            var explosion: Explosion = new Explosion(this.game, this.bomb.x, this.bomb.y, 750, new Phaser.Point(400, 400), this.holder.onTeam);
            this.bomb.texture = null;
            this.bomb.destroy();
            this.bomb = null;
        }
    }  
} 