module Bosem {
    export class BasicAmmo extends Ammo {
        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.lazerAmmo, lazerShooter,lazerShooter.holder.y + lazerShooter.holder.width/2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else
                this.spriteBody.velocity.x = 600;
        }


        hit() {
            this.lazerShooter.holder.enemy.recieveDamage(10 * this.lazerShooter.holder.dmg);
            this.destroy();
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
            Collidable.removeCollidable(this);
        }
        getAttackSpeed() {
            return this.lazerShooter.holder.attackSpeed;
        }
        getRange() {
            return this.lazerShooter.holder.range;
        }
    }
} 