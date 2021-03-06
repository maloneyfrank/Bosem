﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Rocket = (function (_super) {
        __extends(Rocket, _super);
        function Rocket(lazerShooter) {
            _super.call(this, Bosem.ResKeys.rocket, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else {
                this.spriteBody.velocity.x = 600;
                this.scale.x = -1;
            }
        }
        Rocket.prototype.getDamage = function () {
            this.dmg = 10 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };
        Rocket.prototype.hitByBullet = function (bullet) {
            var x = ((this.position.x + bullet.x) / 2);
            var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

            setTimeout(function () {
                if (collisionAnimation)
                    collisionAnimation.destroy();
            }, 300);
            this.killBullet = true;
            new Bosem.Explosion(this.game, this.x + this.width / 2, this.y + this.y / 2, 200);
        };

        Rocket.prototype.getAttackSpeed = function () {
            return this.lazerShooter.holder.attackSpeed;
        };
        Rocket.prototype.getRange = function () {
            return this.lazerShooter.holder.range;
        };
        Rocket.prototype.hitSomething = function (something) {
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
                    new Bosem.Explosion(this.game, this.x, this.y, 200);
                } catch (err) {
                }
            }
        };
        return Rocket;
    })(Bosem.Ammo);
    Bosem.Rocket = Rocket;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Rocket.js.map
