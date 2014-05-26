var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="scripts/res/phaser.d.ts" />
var Bosem;
(function (Bosem) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1024, 768, Phaser.AUTO, 'content');
            this.state.add(Bosem.ResKeys.bootState, Bosem.Boot);
            this.state.add(Bosem.ResKeys.bootState, Bosem.Menu);
            this.state.add(Bosem.ResKeys.battleSate, Bosem.Battle);
            this.state.start(Bosem.ResKeys.bootState);
        }
        return Game;
    })(Phaser.Game);

    window.onload = function () {
        var game = new Game();
    };
})(Bosem || (Bosem = {}));
//# sourceMappingURL=app.js.map
