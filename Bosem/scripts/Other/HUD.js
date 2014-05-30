var Bosem;
(function (Bosem) {
    var HUD = (function () {
        function HUD() {
        }
        HUD.init = function (game) {
            this.game = game;
            this.healthBar1 = this.game.add.sprite(0, 0, Bosem.ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, Bosem.ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
        };

        HUD.dispayHealth = function () {
            this.healthBar1.scale.x = Bosem.KillableInGame.players[0].hp / 1000;
            this.healthBar2.scale.x = Bosem.KillableInGame.players[1].hp / 1000;
        };
        return HUD;
    })();
    Bosem.HUD = HUD;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=HUD.js.map
