module Bosem {
    export class Rocket extends Ammo {
        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.rocket, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else {
                this.spriteBody.velocity.x = 600;
                this.scale.x = -1;
            }
        }



        getDamage() {
            this.dmg = 10 * this.lazerShooter.holder.dmg;
            return this.dmg;
        }
        hitByBullet(bullet: Ammo) {

            var x = ((this.position.x + bullet.x) / 2)
            var collisionAnimation = this.game.add.sprite(x, this.y, ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(ResKeys.collisionSpriteSheet);

            setTimeout(function () { if (collisionAnimation) collisionAnimation.destroy(); }, 300);
            this.killBullet = true;
            new Explosion(this.game, this.x + this.width / 2, this.y + this.y / 2, 200);
        }

        getAttackSpeed() {
            return this.lazerShooter.holder.attackSpeed;
        }
        getRange() {
            return this.lazerShooter.holder.range;
        }
        hitSomething(something: any) {

            if (something != this.lazerShooter.holder) {
                try {
                    this.killBullet = true;
                    var x = ((this.position.x + something.x) / 2)
                     var collisionAnimation = this.game.add.sprite(x, this.y, ResKeys.collisionSpriteSheet);
                    collisionAnimation.animations.add(ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
                    collisionAnimation.play(ResKeys.collisionSpriteSheet);

                    setTimeout(function () { if (collisionAnimation) collisionAnimation.destroy(); }, 300);
                    new Explosion(this.game, this.x, this.y, 200);

                }
                catch (err) { }
            }
        }

    }
}