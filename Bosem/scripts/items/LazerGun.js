var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var LazerGun = (function (_super) {
        __extends(LazerGun, _super);
        function LazerGun(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.lazerGun);
        }
        LazerGun.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Bosem.Ammo.BASIC_AMMO;
        };
        LazerGun.dropRate = 80;
        return LazerGun;
    })(Bosem.Item);
    Bosem.LazerGun = LazerGun;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=LazerGun.js.map
