var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Radar = (function (_super) {
        __extends(Radar, _super);
        function Radar(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.radar);
        }
        Radar.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.lazerShooter.ammoType = Bosem.Ammo.HOMING_MISSLE;
        };
        Radar.dropRate = 30;
        return Radar;
    })(Bosem.Item);
    Bosem.Radar = Radar;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Radar.js.map
