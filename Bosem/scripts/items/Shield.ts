module Bosem {
    export class Shield extends Item {
        static dropRate: number = 60;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.shield);
        }
        init(holder: Player) {
            holder.heldItems.push(this);
            holder.shields++;
        }
        static newInstance(game: Phaser.Game, x: number, y: number) {
            return new Shield(game, x, y);
        }

    }
}  