module Bosem {
    export class LazerShooter {
        game: Phaser.Game;



        holder: Player; // copy of holder 
        bullets = [];
        timer: Phaser.Timer;
        canShoot: boolean;
        constructor(game: Phaser.Game, holder: Player) {
            this.game = game;
            this.holder = holder;
            this.canShoot = true;

        }

        attack(ammoType: number) {

            if (this.canShoot) {
                this.bullets.push(Ammo.returnAmmoType(ammoType, this));
                this.bullets[this.bullets.length - 1].checkWorldBounds = true
                this.bullets[this.bullets.length - 1].outOfBoundsKill = true
                this.canShoot = false;
                this.timerStuff();
            }
        }
        timerStuff() {
            if (this.holder.attackSpeed > 5000) this.holder.attackSpeed = 5000;
            this.timer = this.game.time.create(false);
            this.timer.loop(5000 - this.holder.attackSpeed, this.resetShoot, this);
            this.timer.start();
        }

        update() {

            for (var i = 0; i < this.bullets.length; i++) {
                //Check Ammo-Player collision
                    if (this.game.physics.arcade.intersects(this.bullets[i].body, this.holder.enemy.spriteBody)) {
                        this.bullets[i].hit();
                        this.bullets.splice(i, 1);

                    }

                    //Check Ammo-Ammo Collision

                    for (var j = 0; j < this.holder.enemy.lazerShooter.bullets.length; j++) {
                        if (this.game.physics.arcade.collide(this.bullets[i], this.holder.enemy.lazerShooter.bullets[j])) {
                            var collisionAnimation = this.game.add.sprite(((this.bullets[i].position.x + this.holder.enemy.lazerShooter.bullets[j].position.x) / 2), this.bullets[i].y, ResKeys.collisionSpriteSheet);
                            collisionAnimation.animations.add(ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
                            collisionAnimation.play(ResKeys.collisionSpriteSheet);

                            this.bullets[i].destroy();
                            this.holder.enemy.lazerShooter.bullets[j].destroy();
                            setTimeout(function () { if (collisionAnimation) collisionAnimation.destroy(); }, 300);

                        }

                    }

               
            }

        }
        resetShoot() {
            this.canShoot = true;
        }

    }

} 