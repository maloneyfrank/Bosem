module Bosem {
    export class BoomerangAmmo extends Ammo {
        range: number;
        initialVelocityChangeable: boolean = true;
        secondaryVelocityChangeable: boolean = true;
        shotLeft: boolean = false;
        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.lazerAmmo, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            this.range = 500;
            if (this.initialVelocityChangeable = true) {
                if (this.lazerShooter.holder.facingLeft) {
                    this.shotLeft = true;
                    this.spriteBody.velocity.x = -600;
                    this.initialVelocityChangeable = false;
                }
                else {
                    this.spriteBody.velocity.x = 600;
                    this.initialVelocityChangeable = false;
                }

            }
        }


        update() {
            if (this.getDistanceMoved() >= this.range) {
                if (this.secondaryVelocityChangeable) {
                    this.spriteBody.velocity.x = this.spriteBody.velocity.x * -1;
                    this.secondaryVelocityChangeable = false;

                    this.spriteBody.velocity.y = ((this.lazerShooter.holder.y + this.lazerShooter.holder.height / 2) - this.y) * 1.5;
                }
            }

            if (this.shotLeft) {
                if (this.spriteBody.x > this.lazerShooter.holder.spriteBody.x) {
                    this.killBullet = true;
                }
            } else {
                if (this.spriteBody.x < this.lazerShooter.holder.spriteBody.x) {
                    this.killBullet = true;
               }
            }


           
        }


        getDamage() {
            this.dmg =  15 * this.lazerShooter.holder.dmg;
            return this.dmg;
        }

        hitByBullet(bullet: Ammo) {

            var x = ((this.position.x + bullet.x) / 2)
            var collisionAnimation = this.game.add.sprite(x, this.y, ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(ResKeys.collisionSpriteSheet);

            setTimeout(function () { if (collisionAnimation) collisionAnimation.destroy(); }, 300);
            this.killBullet = true;
        }

        getAttackSpeed() {
            return this.lazerShooter.holder.attackSpeed;
        }
        getRange() {
            return -1;
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
                }
                catch (err) { }
            } 
        }
    }
}
