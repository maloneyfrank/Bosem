var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var SniperGun = (function (_super) {
        __extends(SniperGun, _super);
        function SniperGun(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.sniperAmmo);
        }
        SniperGun.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Bosem.Ammo.SNIPER_AMMO;
        };
        return SniperGun;
    })(Bosem.Item);
    Bosem.SniperGun = SniperGun;
})(Bosem || (Bosem = {}));
