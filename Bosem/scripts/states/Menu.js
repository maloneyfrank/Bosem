var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.preload = function () {
        };
        Menu.prototype.create = function () {
            this.game.state.start(Bosem.ResKeys.battleState);
        };
        return Menu;
    })(Phaser.State);
    Bosem.Menu = Menu;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Menu.js.map
