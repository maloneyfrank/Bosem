var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Kamikaze = (function (_super) {
        __extends(Kamikaze, _super);
        function Kamikaze(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.kamikaze);
        }
        Kamikaze.prototype.init = function (holder) {
            var players = Bosem.KillableInGame.getPlayers();
            for (var i = 0; i < players.length; i++) {
                Bosem.KillableInGame.killPlayer(players[i]);
            }
        };
        return Kamikaze;
    })(Bosem.Item);
    Bosem.Kamikaze = Kamikaze;
})(Bosem || (Bosem = {}));
