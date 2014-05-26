var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var FlamethrowingFish = (function (_super) {
        __extends(FlamethrowingFish, _super);
        function FlamethrowingFish(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.cofee);
        }
        FlamethrowingFish.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.moveSpeed += 100;
            holder.jumpSpeed += 100;
            holder.spriteBody.gravity.y += 50;
        };
        FlamethrowingFish.newInstance = function (game, x, y) {
            return new Bosem.Coffee(game, x, y);
        };
        return FlamethrowingFish;
    })(Bosem.Item);
    Bosem.FlamethrowingFish = FlamethrowingFish;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Copy of Coffee.js.map
