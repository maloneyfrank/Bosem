module Bosem {
    export class BasicAmmo extends Ammo {
        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.lazerAmmo, lazerShooter);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else
                this.spriteBody.velocity.x = 600;
        }

        hit() {
            this.lazerShooter.holder.enemy.recieveDamage(10 * this.lazerShooter.holder.dmg);
            this.destroy();
        }
    }
} 