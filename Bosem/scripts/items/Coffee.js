var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Coffee = (function (_super) {
        __extends(Coffee, _super);
        function Coffee(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.cofee);
        }
        Coffee.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.incrementMoveSpeed(100);
            holder.incrementJumpSpeed(100);
            holder.incrementGravity(50);
        };
        Coffee.dropRate = 100;
        return Coffee;
    })(Bosem.Item);
    Bosem.Coffee = Coffee;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Coffee.js.map
