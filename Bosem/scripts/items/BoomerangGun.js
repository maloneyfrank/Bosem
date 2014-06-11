var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var BoomerangGun = (function (_super) {
        __extends(BoomerangGun, _super);
        function BoomerangGun(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.boomerangGun);
        }
        BoomerangGun.prototype.init = function (holder) {
            holder.lazerShooter.ammoType = Bosem.Ammo.BOOMERANG_AMMO;
        };
        BoomerangGun.dropRate = 40;
        return BoomerangGun;
    })(Bosem.Item);
    Bosem.BoomerangGun = BoomerangGun;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=BoomerangGun.js.map
