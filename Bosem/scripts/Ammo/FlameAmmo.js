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

            if (this.lazerShooter.holder.facingLeft) {
                this.animations.play(Bosem.ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = -100;
                tween = this.game.add.tween(this.scale).to({ x: -1, y: 1 }, 1000, Phaser.Easing.Linear.None, true, 10);
            } else {
                this.animations.play(Bosem.ResKeys.flameAnim, 10, false, true);
                this.spriteBody.velocity.x = 100;
                tween = this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true, 10);
            }
            tween.onComplete.add(this.imOut, this);
        }
        FlameAmmo.prototype.getDamage = function () {
            this.dmg = this.lazerShooter.holder.dmg * 0.5;
            return this.dmg;
        };
        FlameAmmo.prototype.imOut = function () {
            this.destroy();
        };
        FlameAmmo.prototype.getAttackSpeed = function () {
            return 5000;
        };
        FlameAmmo.prototype.getRange = function () {
            return 1000;
        };
        return FlameAmmo;
    })(Bosem.Ammo);
    Bosem.FlameAmmo = FlameAmmo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=FlameAmmo.js.map
