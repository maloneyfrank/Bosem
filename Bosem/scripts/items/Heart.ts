module Bosem {
    export class Heart extends Item{
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.heartFill);
        }
        init(holder: Player) {
            super.init(holder);
            if (this.holder.lives < 8)
                this.holder.lives++;
            else
                this.holder.hp = Player.MAX_HP;
        }
    }
} 