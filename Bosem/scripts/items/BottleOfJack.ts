module Bosem {
    export class BottleOfJack extends Item{
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.bottleOfJack);
        }
        keys: number[];
        init(holder: Player) {
            super.init(holder);
            this.keys = [];
            this.keys.push(holder.moveLeft.keyCode);
            this.keys.push(holder.moveRight.keyCode);
            this.keys.push(holder.attackKey.keyCode);
            this.keys.push(holder.jump.keyCode);

            var num = Math.floor(Math.random() * 4);
            holder.moveLeft = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.moveRight = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.attackKey = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.jump = this.game.input.keyboard.addKey(this.keys[num]);

            this.game.time.events.add(5000, this.resetKeys, this);

            holder.incrementMoveSpeed(100);
            holder.shields += 3;
        }
        resetKeys() {
            this.holder.moveLeft = this.game.input.keyboard.addKey(this.keys[0]);
            this.holder.moveRight = this.game.input.keyboard.addKey(this.keys[1]);
            this.holder.attackKey = this.game.input.keyboard.addKey(this.keys[2]);
            this.holder.jump = this.game.input.keyboard.addKey(this.keys[3]);
            this.holder.incrementMoveSpeed(-120);
        }
    }
} 