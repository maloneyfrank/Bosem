var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var RocketLauncher = (function (_super) {
        __extends(RocketLauncher, _super);
        function RocketLauncher(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.rocketLauncher);
        }
        RocketLauncher.prototype.init = function (holder) {
            holder.lazerShooter.ammoType = Bosem.Ammo.ROCKET;
        };
        RocketLauncher.dropRate = 20;
        return RocketLauncher;
    })(Bosem.Item);
    Bosem.RocketLauncher = RocketLauncher;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=RocketLauncher.js.map
