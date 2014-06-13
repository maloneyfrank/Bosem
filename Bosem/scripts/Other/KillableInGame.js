var Bosem;
(function (Bosem) {
    var KillableInGame = (function () {
        function KillableInGame() {
        }
        KillableInGame.init = function (game, numPlayers) {
            this.game = game;
            this.players = [];
            this.teams = [];
            for (var i = 0; i < numPlayers; i++) {
                var team = [];
                var xLoc = 300 + 60 * i;
                this.players.push(new Bosem.Player(this.game, xLoc, 30, i));
                team.push(this.players[i]);
                this.teams.push(team);
                Bosem.Collidable.addCollidable(this.players[i]);
            }
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
                if (player.lives > 1) {
                    player.canDie = false;
                    this.locationStuff(player);
                    player.lives--;
                    var killed = player;
                    player.kill();
                    player.hp = Bosem.Player.MAX_HP;
                    this.game.time.events.add(1000, function () {
                        killed.revive();
                        killed.canDie = true;
                        var position = Math.floor(killed.game.camera.x + (Math.random() * killed.game.camera.width));
                        killed.position.set(position, 0);
                        killed.checkWorldBounds = true;
                        killed.canDie = true;
                    }, this);
                } else {
                    this.endGame(player.onTeam);
                }
            }
        };
        KillableInGame.endGame = function (onTeam) {
            localStorage.clear();

            //stores loser
            localStorage.setItem('loser', onTeam.toString());
            localStorage.setItem('numPlayers', KillableInGame.players.length.toString());
            for (var i = 0; i < KillableInGame.players.length; i++) {
                var itemResKeys = "";
                for (var j = 0; j < KillableInGame.players[i].heldItems.length; j++) {
                    itemResKeys += KillableInGame.players[i].heldItems[j].key + "|";
                }
                localStorage.setItem("playerItems" + i.toString(), itemResKeys);
            }

            this.game.state.start(Bosem.ResKeys.endGameState, true, false);
        };
        KillableInGame.locationStuff = function (player) {
            var x = player.x;
            var y = player.y;
            player.x = -500;
            player.y = -500;
            Bosem.ItemManager.spawnItem(x, y);
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
        KillableInGame.getKillables = function () {
            var killables = [];
            for (var i = 0; i < this.teams.length; i++) {
                killables = killables.concat(this.teams[i]);
            }
            return killables;
        };
        return KillableInGame;
    })();
    Bosem.KillableInGame = KillableInGame;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=KillableInGame.js.map
