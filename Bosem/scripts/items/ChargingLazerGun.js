var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var ChargingLazerGun = (function (_super) {
        __extends(ChargingLazerGun, _super);
        function ChargingLazerGun(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.chargingLazerGun);
        }
        ChargingLazerGun.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            holder.lazerShooter.ammoType = Bosem.Ammo.CHARGING_LAZER;
        };
        ChargingLazerGun.dropRate = 40;
        return ChargingLazerGun;
    })(Bosem.Item);
    Bosem.ChargingLazerGun = ChargingLazerGun;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=ChargingLazerGun.js.map
