module Bosem {
    export class Ammo extends Phaser.Sprite {
        lazerShooter: LazerShooter;
        spriteBody: Phaser.Physics.Arcade.Body;
        static BASIC_AMMO: number = 0;
        static HOMING_MISSLE: number = 1;
        static SNIPER_AMMO: number = 2;
        static CHARGING_LAZER: number = 3;
        distanceMoved:number;
        dmg: number;
        onTeam: number;
        oldX: number;
        killBullet: boolean;
        constructor(key: string, lazerShooter: LazerShooter, y:number) {
            if (lazerShooter.holder.facingLeft)
                super(lazerShooter.game, lazerShooter.holder.x - lazerShooter.holder.width, y, key);
            else
                super(lazerShooter.game, lazerShooter.holder.x+ lazerShooter.holder.width, y, key);
            this.lazerShooter = lazerShooter;
            this.lazerShooter.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.lazerShooter.game.add.existing(this);
            this.spriteBody = this.body;
            this.onTeam = lazerShooter.onTeam;
            this.distanceMoved = 0;
            this.oldX = this.x;
            this.killBullet = false;

        }

        getDamage() {
            return this.dmg;
        }
        static returnAmmoType(type: number, lazerShooter: LazerShooter):Ammo {
            switch (type) {
                case Ammo.BASIC_AMMO:
                    return new BasicAmmo(lazerShooter);
                    break;
                case Ammo.HOMING_MISSLE:
                    return new HomingMissle(lazerShooter);
                    break;
                case Ammo.SNIPER_AMMO:
                    return new SniperAmmo(lazerShooter);
                    break;
                case Ammo.CHARGING_LAZER:
                    return new ChargingLazer(lazerShooter);
                    break;
            }
        }
        getAttackSpeed() {
            return 3500;
        }
        hitByBullet(bullet: Ammo) {

        }
        hitSomething(something: any) {
                this.destroy();
                this.killBullet = true;
        }
        getRange() {
            return 500;
        }
        getDistanceMoved() {
            return this.distanceMoved;
        }
        updateDistanceMoved() {
            if (this.x > this.oldX)
                this.distanceMoved += this.x - this.oldX;
            else
                this.distanceMoved += this.oldX - this.x;
            this.oldX = this.x;

        }

    }
}