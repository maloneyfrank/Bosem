module Bosem {
    export class ChargingLazer extends Ammo {
        notReleased: boolean;
        size: number;
        initialHeight: number;
        initialWidth: number;
        constructor(lazerShooter: LazerShooter) {
            super(ResKeys.chargingBall, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            this.notReleased = true;
            this.size = 0;
            this.initialHeight = this.height;
            this.initialWidth = this.width;
            this.game.time.events.add(10000, this.lazerShooter.resetShoot, this);
        }
        update() {
            if (this.notReleased) {
                if (this.lazerShooter.holder.attackKey.isDown) {
                    this.size++;
                    if (this.size > 300) this.size = 300;
                    this.height = this.initialHeight + Math.floor(this.size / 10);
                    this.width = this.initialWidth + Math.floor(this.size / 10);
                    this.y = this.lazerShooter.holder.y + this.lazerShooter.holder.height / 2 - this.height / 2;
                    if (this.lazerShooter.holder.facingLeft)
                        this.x = this.lazerShooter.holder.x - this.width;
                    else
                        this.x = this.lazerShooter.holder.x + this.lazerShooter.holder.width
                    }
                else {
                    this.notReleased = false;
                    this.loadTexture(ResKeys.chargedLazer, 0);
                    this.initialHeight = this.height;
                    this.initialWidth = this.width;
                }
            }
            else {
                if (this.lazerShooter.holder.facingLeft) {
                    this.width = 768 * this.size / 450;
                    this.x = this.lazerShooter.holder.x - this.width;
                }
                else {
                    this.width = 768 * this.size / 450;
                    this.x = this.lazerShooter.holder.x + this.lazerShooter.holder.width
                }
                
                this.height = this.initialHeight * this.size / 500;
                this.y = this.lazerShooter.holder.y + this.lazerShooter.holder.height / 2 - this.height / 2;
                this.game.time.events.add(150, this.killSelf, this);
            }
        }
        getAttackSpeed() {
            return -10;
        }
        hitSomething(something: any) {
            if (something != this.lazerShooter.holder) {
                this.killSelf();
            }
        }

       hitByBullet(bullet: Ammo) {
            this.killSelf();
        }

        getDamage() {
            if (this.notReleased)
                this.dmg = 2;
            else
                this.dmg = this.lazerShooter.holder.dmg * this.size / 5;

            return this.dmg;
        }
        getRange() {
            return -1;
        }
        killSelf() {
            this.killBullet = true;
            this.lazerShooter.resetShoot();
        }
    }
} 