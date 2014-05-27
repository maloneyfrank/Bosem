var Bosem;
(function (Bosem) {
    var KillableInGame = (function () {
        function KillableInGame() {
        }
        KillableInGame.init = function (game, numPlayers) {
            this.game = game;
            this.players = [];
            this.teams = [[numPlayers], [1]];
            for (var i = 0; i < numPlayers; i++) {
                this.players.push(new Bosem.Player(this.game, this.game.width - this.game.width / (i + 1), 30, i));
                this.teams[i].push(this.players[i]);
                Bosem.Collidable.addCollidable(this.players[i]);
            }

            //need to get rid of this eventually, make it an array of enemies (or no enemies at all...just deal with allies) but for now, dont want to deal
            this.players[0].setEnemy(this.players[1]);
            this.players[1].setEnemy(this.players[0]);
        };
        KillableInGame.addKillable = function (killable, teamNum) {
            this.teams[teamNum].push(killable);
            Bosem.Collidable.addCollidable(killable);
        };
        KillableInGame.getAllies = function (teamNum) {
            return this.teams[teamNum];
        };
        KillableInGame.getPlayers = function () {
            return this.players;
        };
        KillableInGame.getPlayersGroup = function () {
            var group = new Phaser.Group(this.game);
            for (var i = 0; i < this.players.length; i++) {
                group.add(this.players[i]);
            }
            return group;
        };
        KillableInGame.killPlayer = function (player) {
            if (player.canDie) {
                player.canDie = false;
                player.lives--;
                var killed = player;
                player.kill();
                this.game.time.events.add(1000, function () {
                    killed.revive();
                    killed.canDie = true;
                    killed.position.set(Math.floor(Math.random() * killed.game.world.width), 100);
                    killed.checkWorldBounds = true;
                    killed.canDie = true;
                }, this);
            }
        };

        //checks to be made
        KillableInGame.update = function () {
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

        KillableInGame.killKillable = function (killable) {
            //implement
        };
        return KillableInGame;
    })();
    Bosem.KillableInGame = KillableInGame;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=KillableInGame.js.map
