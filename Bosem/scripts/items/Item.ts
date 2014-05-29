module Bosem {
    export class Item extends Phaser.Sprite {
        game: Phaser.Game;
        holder: Player; //copy of player that is holding this item
        spriteBody: Phaser.Physics.Arcade.Body;
        onTeam: number;
        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 100;
            this.game.add.existing(this);
        }
        init(holder: Player) {
            this.holder = holder;
            this.onTeam = holder.onTeam;
            //code to be run only once, when the item is picked up by the player
        }
        effect() {
            //to be called whenever this item is activated
        }

        itemUpdate() {
            //called every fram for any continuous effect
        }
        hitByBullet(bullet: Ammo) {

        }
        static randomItem(game: Phaser.Game, x: number, y: number) {
              var num = Math.floor(Math.random() * 7);
            switch (num) {
                case 0:
                    return new Coffee(game, x, y);
                    break;
                case 1:
                    return new FlamethrowingFish(game, x, y);
                    break;
                case 2:
                    return new Shield(game, x, y);
                    break;
                case 3:
                    return new Kamikaze(game, x, y);
                    break;
                case 4:
                    return new Tabasco(game, x, y)
                    break;
                case 5:
                    return new LazerGun(game, x, y);
                    break;
                case 6:
                    return new SniperGun(game, x, y);
                    break;
            }
            return new FlamethrowingFish(game, x, y);
            
        }
    }
} 