var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Heart = (function (_super) {
        __extends(Heart, _super);
        function Heart(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.heartFill);
        }
        Heart.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            holder.incrementLives(1);
        };
        return Heart;
    })(Bosem.Item);
    Bosem.Heart = Heart;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Heart.js.map
