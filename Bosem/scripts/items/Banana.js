var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Banana = (function (_super) {
        __extends(Banana, _super);
        function Banana(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.bananaItem);
        }
        Banana.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            this.facingLeft = holder.facingLeft;
            holder.effectItems.push(this);
            this.game.time.events.add(250, this.removeFromEffect, this);
            holder.spriteBody.velocity.x = 0;
        };
        Banana.prototype.removeFromEffect = function () {
            var index = this.holder.effectItems.indexOf(this);
            this.holder.effectItems.splice(index, 1);
        };
        Banana.prototype.itemUpdate = function () {
            if (this.facingLeft) {
                this.holder.spriteBody.velocity.x = -1500;
            } else
                this.holder.spriteBody.velocity.x = 1500;
        };
        return Banana;
    })(Bosem.Item);
    Bosem.Banana = Banana;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Banana.js.map
