var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Scope = (function (_super) {
        __extends(Scope, _super);
        function Scope(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.scopeItem);
        }
        Scope.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            holder.incrementAttackSpeed(20);
            holder.incrementDamage(2);
            holder.incrementRange(30);
        };
        Scope.dropRate = 100;
        return Scope;
    })(Bosem.Item);
    Bosem.Scope = Scope;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Scope.js.map
