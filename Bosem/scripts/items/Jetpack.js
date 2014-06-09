var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Jetpack = (function (_super) {
        __extends(Jetpack, _super);
        function Jetpack(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.jetpack);
            this.timeNotCalled = true;
        }
        Jetpack.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            this.holder.useItem = this;
        };
        Jetpack.prototype.effect = function () {
            this.holder.spriteBody.velocity.y -= 30;

            setTimeout(this.killJetPack, 6000);
        };

        Jetpack.prototype.killJetPack = function () {
            this.holder.useItem = null;
            this.destroy();
        };
        Jetpack.dropRate = 70;
        return Jetpack;
    })(Bosem.Item);
    Bosem.Jetpack = Jetpack;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Jetpack.js.map
