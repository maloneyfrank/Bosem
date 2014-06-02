var Bosem;
(function (Bosem) {
    var HUD = (function () {
        function HUD() {
        }
        HUD.init = function (game) {
            this.game = game;

            this.healthHearts = [];
            this.heartFills = [];

            for (var i = 0; i < Bosem.KillableInGame.players.length; i++) {
                this.healthHearts.push(new Array());
                this.heartFills.push(new Array());
                for (var j = 0; j < Bosem.KillableInGame.players[i].lives; j++) {
                    if (i == 0) {
                        this.heartFills[i].push(new Phaser.Sprite(this.game, j * 60, 0, Bosem.ResKeys.heartFill));
                        this.healthHearts[i].push(new Phaser.Sprite(this.game, j * 60, 0, Bosem.ResKeys.heartPic));
                    }
                    if (i == 1) {
                        this.heartFills[i].push(new Phaser.Sprite(this.game, this.game.width - ((j + 1) * 60), 0, Bosem.ResKeys.heartFill));
                        this.healthHearts[i].push(new Phaser.Sprite(this.game, this.game.width - ((j + 1) * 60), 0, Bosem.ResKeys.heartPic));
                    }
                    this.game.add.existing(this.healthHearts[i][j]);
                    this.game.add.existing(this.heartFills[i][j]);
                }
            }
        };

        HUD.displayHud = function () {
            this.dispayHealth();
        };
        HUD.dispayHealth = function () {
            for (var i = 0; i < Bosem.KillableInGame.players.length; i++) {
                if (this.healthHearts[i].length > Bosem.KillableInGame.players[i].lives) {
                    this.healthHearts[i][this.healthHearts[i].length - 1].destroy();
                    this.heartFills[i][this.heartFills[i].length - 1].destroy();

                    this.healthHearts[i].pop();
                    this.heartFills[i].pop();
                }
                var currentHeart = this.heartFills[i][this.heartFills[i].length - 1];
                currentHeart.height = 56 * Bosem.KillableInGame.players[i].hp / 1000;
                currentHeart.position.y = 56 - currentHeart.height;
            }
        };
        return HUD;
    })();
    Bosem.HUD = HUD;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=HUD.js.map
