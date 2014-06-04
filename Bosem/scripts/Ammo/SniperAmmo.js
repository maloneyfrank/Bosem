var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var SniperAmmo = (function (_super) {
        __extends(SniperAmmo, _super);
        function SniperAmmo(lazerShooter) {
            _super.call(this, Bosem.ResKeys.sniperAmmo, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.width / 2);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -1500;
            else
                this.spriteBody.velocity.x = 1500;
        }
        SniperAmmo.prototype.getDamage = function () {
            this.dmg = 30 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };
        SniperAmmo.prototype.hitByBullet = function (bullet) {
            var x = ((this.position.x + bullet.x) / 2);
            var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

            setTimeout(function () {
                if (collisionAnimation)
                    collisionAnimation.destroy();
            }, 300);
            Bosem.Collidable.removeCollidable(this);
        };
        SniperAmmo.prototype.getAttackSpeed = function () {
            return this.lazerShooter.holder.attackSpeed / 3;
        };
        SniperAmmo.prototype.getRange = function () {
            return this.lazerShooter.holder.range + 500;
        };
        return SniperAmmo;
    })(Bosem.Ammo);
    Bosem.SniperAmmo = SniperAmmo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=SniperAmmo.js.map
