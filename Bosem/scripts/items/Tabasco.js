var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Tabasco = (function (_super) {
        __extends(Tabasco, _super);
        function Tabasco(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.tabasco);
        }
        Tabasco.prototype.init = function (holder) {
            holder.heldItems.push(this);
            //  holder.lazerShooter.ammoType = Ammo.FLAME_AMMO;
        };
        return Tabasco;
    })(Bosem.Item);
    Bosem.Tabasco = Tabasco;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Tabasco.js.map
