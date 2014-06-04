var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var BasicAmmo = (function (_super) {
        __extends(BasicAmmo, _super);
        function BasicAmmo(lazerShooter) {
            _super.call(this, Bosem.ResKeys.lazerAmmo, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.width / 2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else
                this.spriteBody.velocity.x = 600;
        }
        BasicAmmo.prototype.getDamage = function () {
            this.dmg = 10 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };
        BasicAmmo.prototype.hitByBullet = function (bullet) {
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

        BasicAmmo.prototype.getAttackSpeed = function () {
            return this.lazerShooter.holder.attackSpeed;
        };
        BasicAmmo.prototype.getRange = function () {
            return this.lazerShooter.holder.range;
        };
        BasicAmmo.prototype.hitSomething = function (something) {
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
        };
        return BasicAmmo;
    })(Bosem.Ammo);
    Bosem.BasicAmmo = BasicAmmo;
})(Bosem || (Bosem = {}));
