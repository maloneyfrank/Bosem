var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle() {
            _super.apply(this, arguments);
        }
        Battle.prototype.create = function () {
            this.player1 = new Bosem.Player(this.game, 1);
        };
        return Battle;
    })(Phaser.State);
    Bosem.Battle = Battle;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Battle.js.map
