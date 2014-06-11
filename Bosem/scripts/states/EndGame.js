var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var EndGame = (function (_super) {
        __extends(EndGame, _super);
        function EndGame() {
            _super.apply(this, arguments);
        }
        EndGame.prototype.preload = function () {
            this.game.stage.backgroundColor = '#000000';
            this.numPlayers = +localStorage.getItem('numPlayers');
            var loser = +localStorage.getItem('loser');
            this.announcement = "Player " + (loser + 1).toString() + " has lost";

            this.playerItems = [];
            for (var i = 0; i < this.numPlayers; i++) {
                var thisPlayersItems = [];
                var itemResKeys = localStorage.getItem("playerItems" + i.toString());
                for (var j = 0; j < itemResKeys.length; j++) {
                    if (itemResKeys.charAt(j) == '|') {
                        var resKey = itemResKeys.substr(0, j);
                        itemResKeys = itemResKeys.substring(j + 1);
                        j = 0;
                        if (resKey.length > 2)
                            thisPlayersItems.push(resKey);
                    }
                }
                this.playerItems.push(thisPlayersItems);
            }

            this.startMenuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        };
        EndGame.prototype.create = function () {
            this.game.add.text(20, 20, this.announcement, { font: '34px Arial', fill: '#fff' });

            this.game.add.text(this.game.width / 2 - this.game.width / 5, 50, 'Press Enter To Continue', { font: '15px Arial', fill: '#fff' });

            this.game.add.image(this.game.width / 4, 100, Bosem.ResKeys.player1Sprite, 0);
            this.game.add.text(this.game.width / 4 - 10, 170, 'Player 1', { font: '15px Arial', fill: '#fff' });

            this.game.add.image(this.game.width * 3 / 4, 100, Bosem.ResKeys.player2Sprite, 0);
            this.game.add.text(this.game.width * 3 / 4 - 10, 170, 'Player 2', { font: '15px Arial', fill: '#fff' });

            for (var i = 0; i < this.playerItems[0].length; i++) {
                var x = i % 3 * 80 + this.game.width / 6;
                var y = Math.floor(i / 3) * 80 + 250;
                this.game.add.image(x, y, this.playerItems[0][i]);
            }
            for (var i = 0; i < this.playerItems[1].length; i++) {
                var x = i % 3 * 80 + this.game.width * 4 / 6;
                var y = Math.floor(i / 3) * 80 + 250;
                this.game.add.image(x, y, this.playerItems[1][i]);
            }
        };
        EndGame.prototype.update = function () {
            if (this.startMenuKey.isDown) {
                this.game.state.start(Bosem.ResKeys.menuState, true, false);
            }
        };
        return EndGame;
    })(Phaser.State);
    Bosem.EndGame = EndGame;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=EndGame.js.map
