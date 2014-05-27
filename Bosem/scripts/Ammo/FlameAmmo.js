var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var FlameAmmo = (function (_super) {
        __extends(FlameAmmo, _super);
        function FlameAmmo(lazerShooter) {
            _super.call(this, Bosem.ResKeys.flameAmmo, lazerShooter);
            this.animations.add(Bosem.ResKeys.flameAnim, [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
            var tween;
            this.y = this.lazerShooter.holder.y - 60;
            this.anchor.y = -1;
            if (this.lazerShooter.holder.facingLeft) {
                this.scale.x = -0.8;
                this.animations.play(Bosem.ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = -300;
                tween = this.game.add.tween(this.scale).to({ x: -1, y: 1 }, 1000, Phaser.Easing.Linear.None, true, 10);
                this.areaRect = new Phaser.Rectangle(this.x - 250, this.y, 250, 60);
            } else {
                this.scale.x = 0.8;
                this.animations.play(Bosem.ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = 300;
                tween = this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true, 10);
                this.areaRect = new Phaser.Rectangle(this.x, this.y, 250, 60);
            }
            this.update();
            tween.onComplete.add(this.imOut, this);
        }
        FlameAmmo.prototype.update = function () {
            if (this.lazerShooter.holder.facingLeft)
                this.x = this.lazerShooter.holder.x - this.lazerShooter.holder.width;
            else
                this.x = this.lazerShooter.holder.x + 3 + this.lazerShooter.holder.width;
            this.y = this.lazerShooter.holder.y - 60;
            if (this.areaRect.contains(this.lazerShooter.holder.enemy.x, this.lazerShooter.holder.enemy.y))
                this.realHit();
        };
        FlameAmmo.prototype.getDamage = function () {
            this.dmg = 0.5 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };
        FlameAmmo.prototype.realHit = function () {
            this.lazerShooter.holder.enemy.recieveDamage(0.5 * this.lazerShooter.holder.dmg);
        };
        FlameAmmo.prototype.imOut = function () {
            this.destroy();
        };
        return FlameAmmo;
    })(Bosem.Ammo);
    Bosem.FlameAmmo = FlameAmmo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=FlameAmmo.js.map
