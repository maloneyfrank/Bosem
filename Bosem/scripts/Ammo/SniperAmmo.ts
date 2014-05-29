module Bosem {
    export class SniperAmmo extends Ammo{
         constructor(lazerShooter: LazerShooter) {
            super(ResKeys.sniperAmmo, lazerShooter,lazerShooter.holder.y + lazerShooter.holder.width/2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -1500;
            else
                this.spriteBody.velocity.x = 1500;

        }

        hit() {
            this.lazerShooter.holder.enemy.recieveDamage(30 * this.lazerShooter.holder.dmg);
            this.destroy();
        }
        getDamage() {
            this.dmg = 30 * this.lazerShooter.holder.dmg;
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
            return this.lazerShooter.holder.attackSpeed / 3;
        }
        getRange() {
            return this.lazerShooter.holder.range + 500;
        }
      }
}