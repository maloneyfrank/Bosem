module Bosem {
    export class Explosion extends Phaser.Sprite {

        actWidth: number;
        actHeight: number;

        xLoc:number;
        yLoc:number;
        constructor(game: Phaser.Game, x: number, y: number, damage: number, size?: Phaser.Point, onTeam?: number) {
            this.xLoc = x -64;
            this.yLoc = y -64;
            if (size) {
                this.xLoc = x - size.x / 2;
                this.yLoc = y - size.y / 2;
            }
            super(game, this.xLoc, this.yLoc, ResKeys.explosionAnimation);
            this.game = game;
            this.game.physics.arcade.enable(this);
            this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20);
            this.actWidth = this.width;
            this.actHeight = this.height;

            if (size) {
                this.scale.x = size.x / this.actWidth;
                this.scale.y = size.y / this.actHeight;
                this.actWidth = size.x;
                this.actHeight = size.y;
            }
            this.game.add.existing(this);
            this.animations.play('explode');

            var killables: Killable[] = KillableInGame.getKillables();

            for (var i = 0; i < killables.length; i++) {
                var kill: Killable = killables[i];
                if (onTeam) {
                    if (kill.onTeam == onTeam) {
                        break;
                    }
                }
                if (this.intersects(kill)) {
                    kill.recieveDamage(damage);
                }

            }
            this.game.time.events.add(500, this.removeSelf, this);
        }
       
        removeSelf() {
            this.destroy();
        }
        intersects(body: Killable) {
            if (body.x + body.width <= this.xLoc)
                return false;
            
            if (body.y + body.height <= this.yLoc)
                return false

            if (body.x >= this.xLoc + this.actWidth)
                return false;
            if (body.y >= this.yLoc + this.actHeight)
                return false;

            return true;
        }
       
    }
} 