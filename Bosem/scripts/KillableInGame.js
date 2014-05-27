var Bosem;
(function (Bosem) {
    var KillableInGame = (function () {
        function KillableInGame(game, numPlayers) {
            this.game = game;
            this.players = [];
            this.teams = [[numPlayers], [1]];
            for (var i = 0; i < numPlayers; i++) {
                this.players.push(new Bosem.Player(this.game, this.game.width - this.game.width / (i + 1), 30, i));
                this.teams[i].push(this.players[i]);
            }

            //need to get rid of this eventually, make it an array of enemies (or no enemies at all...just deal with allies) but for now, dont want to deal
            this.players[0].setEnemy(this.players[1]);
            this.players[1].setEnemy(this.players[0]);
        }
        KillableInGame.prototype.addKillable = function (killable, teamNum) {
            this.teams[teamNum].push(killable);
        };
        KillableInGame.prototype.getAllies = function (teamNum) {
            return this.teams[teamNum];
        };
        KillableInGame.prototype.getPlayers = function () {
            return this.players;
        };
        KillableInGame.prototype.killPlayer = function (player) {
            player.lives--;
            var killed = player;
            player.kill();

            setTimeout(function () {
                killed.revive();
                killed.canDie = true;
                killed.position.set(Math.floor(Math.random() * killed.game.world.width), 100);
                killed.checkWorldBounds = true;
                killed.hp = 1000;
            }, 100);
        };

        //checks to be made
        KillableInGame.prototype.update = function () {
            for (var i = 0; i < this.teams.length; i++) {
                for (var j = 0; j < this.teams[i].length; j++) {
                    if (this.teams[i][j] instanceof Bosem.Player && this.teams[i][j].hp <= 0) {
                        this.killPlayer(this.teams[i][j]);
                    } else if (this.teams[i][j].hp <= 0) {
                        this.killKillable(this.teams[i][j]); //needs to be implemented
                    }
                }
            }
        };

        KillableInGame.prototype.killKillable = function (killable) {
            //implement
        };
        return KillableInGame;
    })();
    Bosem.KillableInGame = KillableInGame;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=KillableInGame.js.map
