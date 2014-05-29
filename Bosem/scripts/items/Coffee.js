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
            holder.moveSpeed += 100;
            holder.jumpSpeed += 100;
            holder.spriteBody.gravity.y += 50;
        };
        return Coffee;
    })(Bosem.Item);
    Bosem.Coffee = Coffee;
})(Bosem || (Bosem = {}));
