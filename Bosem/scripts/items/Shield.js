var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        function Shield(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.shield);
        }
        Shield.prototype.init = function (holder) {
            holder.heldItems.push(this);
            holder.shields++;
        };
        Shield.newInstance = function (game, x, y) {
            return new Shield(game, x, y);
        };
        return Shield;
    })(Bosem.Item);
    Bosem.Shield = Shield;
})(Bosem || (Bosem = {}));
