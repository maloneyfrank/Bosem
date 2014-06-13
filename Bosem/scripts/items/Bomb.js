var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Bomb = (function (_super) {
        __extends(Bomb, _super);
        function Bomb(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.bombItem);
        }
        Bomb.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            holder.useItem = this;
        };
        Bomb.prototype.effect = function () {
            this.bomb = this.game.add.image(this.holder.x, this.holder.y, Bosem.ResKeys.bombItem);
            this.game.time.events.add(3000, this.explode, this);
            this.holder.useItem = null;
        };
        Bomb.prototype.explode = function () {
            var explosion = new Bosem.Explosion(this.game, this.bomb.x, this.bomb.y, 750, new Phaser.Point(400, 400), this.holder.onTeam);
            this.bomb.texture = null;
            this.bomb.destroy();
            this.bomb = null;
        };
        return Bomb;
    })(Bosem.Item);
    Bosem.Bomb = Bomb;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Bomb.js.map
