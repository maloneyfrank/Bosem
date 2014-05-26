module Bosem {
    export class Ammo extends Phaser.Sprite {
        lazerShooter: LazerShooter;
        spriteBody: Phaser.Physics.Arcade.Body;
        static BASIC_AMMO: number = 0;
        static FLAME_AMMO: number = 1;
        constructor(key: string, lazerShooter: LazerShooter) {
            if (lazerShooter.holder.facingLeft)
                super(lazerShooter.game, lazerShooter.holder.x - lazerShooter.holder.width, lazerShooter.holder.y + lazerShooter.holder.height / 2, key);
            else
                super(lazerShooter.game, lazerShooter.holder.x + 3 + lazerShooter.holder.width, lazerShooter.holder.y + lazerShooter.holder.height / 2, key);
            this.lazerShooter = lazerShooter;
            this.lazerShooter.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.lazerShooter.game.add.existing(this);
            this.spriteBody = this.body;
        }

        hit() {

        }
        static returnAmmoType(type: number, lazerShooter: LazerShooter) {
            switch (type) {
                case Ammo.BASIC_AMMO:
                    return new BasicAmmo(lazerShooter);
                    break;
                case Ammo.FLAME_AMMO:
                    return new FlameAmmo(lazerShooter);
            }
        }
    }
}