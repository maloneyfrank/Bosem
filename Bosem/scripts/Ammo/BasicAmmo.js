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
            _super.call(this, Bosem.ResKeys.lazerAmmo, lazerShooter);
            if (this.lazerShooter.holder.facingLeft)
                this.spriteBody.velocity.x = -600;
            else
                this.spriteBody.velocity.x = 600;
        }
        BasicAmmo.prototype.hit = function () {
            this.lazerShooter.holder.enemy.recieveDamage(10 * this.lazerShooter.holder.dmg);
            this.destroy();
        };
        return BasicAmmo;
    })(Bosem.Ammo);
    Bosem.BasicAmmo = BasicAmmo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=BasicAmmo.js.map
