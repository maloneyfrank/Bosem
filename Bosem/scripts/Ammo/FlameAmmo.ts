module Bosem {
    export class FlameAmmo extends Ammo{

        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.flameAmmo, lazerShooter);
            this.animations.add(ResKeys.flameAnim, [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
            var tween: Phaser.Tween;
          
            if (this.lazerShooter.holder.facingLeft) {
                this.animations.play(ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = -100;
                tween = this.game.add.tween(this.scale).to({ x: -1,y:1 }, 1000, Phaser.Easing.Linear.None, true, 10);

            }
            else {
                this.animations.play(ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = 100;
                tween = this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true, 10);
            }
            tween.onComplete.add(this.imOut, this);
            
        }
       
       
        getDamage() {
            this.dmg = this.lazerShooter.holder.dmg * 0.5;
            return this.dmg;
        }
        imOut() {
            this.destroy();
        }
        getAttackSpeed() {
            return 5000;
        }
        getRange() {
            return 1000;
        }
    }
}
