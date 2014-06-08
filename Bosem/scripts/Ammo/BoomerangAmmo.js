var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var BoomerangAmmo = (function (_super) {
        __extends(BoomerangAmmo, _super);
        function BoomerangAmmo(lazerShooter) {
            _super.call(this, Bosem.ResKeys.lazerAmmo, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            this.initialVelocityChangeable = true;
            this.secondaryVelocityChangeable = true;
            this.shotLeft = false;
            this.range = 500;
            if (this.initialVelocityChangeable = true) {
                if (this.lazerShooter.holder.facingLeft) {
                    this.shotLeft = true;
                    this.spriteBody.velocity.x = -600;
                    this.initialVelocityChangeable = false;
                } else {
                    this.spriteBody.velocity.x = 600;
                    this.initialVelocityChangeable = false;
                }
            }
        }
        BoomerangAmmo.prototype.update = function () {
            if (this.getDistanceMoved() >= this.range) {
                if (this.secondaryVelocityChangeable) {
                    this.spriteBody.velocity.x = this.spriteBody.velocity.x * -1;
                    this.secondaryVelocityChangeable = false;
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
        };

        BoomerangAmmo.prototype.getDamage = function () {
            this.dmg = 15 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };

        BoomerangAmmo.prototype.hitByBullet = function (bullet) {
            var x = ((this.position.x + bullet.x) / 2);
            var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

            setTimeout(function () {
                if (collisionAnimation)
                    collisionAnimation.destroy();
            }, 300);
            this.killBullet = true;
        };

        BoomerangAmmo.prototype.getAttackSpeed = function () {
            return this.lazerShooter.holder.attackSpeed;
        };
        BoomerangAmmo.prototype.getRange = function () {
            return -1;
        };
        BoomerangAmmo.prototype.hitSomething = function (something) {
            if (something != this.lazerShooter.holder) {
                try  {
                    this.killBullet = true;
                    var x = ((this.position.x + something.x) / 2);
                    var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
                    collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
                    collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

                    setTimeout(function () {
                        if (collisionAnimation)
                            collisionAnimation.destroy();
                    }, 300);
                } catch (err) {
                }
            }
        };
        return BoomerangAmmo;
    })(Bosem.Ammo);
    Bosem.BoomerangAmmo = BoomerangAmmo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=BoomerangAmmo.js.map
