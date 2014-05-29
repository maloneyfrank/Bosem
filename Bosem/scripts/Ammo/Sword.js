var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Sword = (function (_super) {
        __extends(Sword, _super);
        function Sword(game, x, y) {
            if (typeof x === "undefined") { x = 50; }
            if (typeof y === "undefined") { y = 50; }
            _super.call(this, game, x, y, Bosem.ResKeys.simpleSwordSprite);
            this.rotation = 90;
        }
        Sword.prototype.pickup = function (holder, enemy) {
            _super.prototype.pickup.call(this, holder, enemy);
            this.anchor.setTo(0, 0);
        };
        Sword.prototype.update = function () {
            if (this.held) {
                if (this.holder.facingLeft) {
                    this.anchor.set(0, 0);
                } else {
                    this.anchor.set(-1, 0);
                }
                this.position.x = this.holder.position.x;
                this.position.y = this.holder.position.y - 25;
            }
        };
        return Sword;
    })(Bosem.Weapon);
    Bosem.Sword = Sword;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Sword.js.map
