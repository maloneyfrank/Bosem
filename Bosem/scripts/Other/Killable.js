var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Killable = (function (_super) {
        __extends(Killable, _super);
        function Killable() {
            _super.apply(this, arguments);
        }
        Killable.prototype.recieveDamage = function (damage) {
        };
        return Killable;
    })(Phaser.Sprite);
    Bosem.Killable = Killable;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Killable.js.map
