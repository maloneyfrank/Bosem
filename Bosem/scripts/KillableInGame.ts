module Bosem {
    export class KillableInGame {

        //adds players in the beginnign of the game
        players: Player[]; //players in game
        teams: any[][]; //team of any player
        game: Phaser.Game;
        constructor(game: Phaser.Game, numPlayers: number) {
            this.game = game;
            this.players = [];
            this.teams = [[numPlayers], [1]];
            for (var i = 0; i < numPlayers; i++) {
                this.players.push(new Player(this.game, this.game.width - this.game.width / (i + 1), 30, i));
                this.teams[i].push(this.players[i]);
            }

            //need to get rid of this eventually, make it an array of enemies (or no enemies at all...just deal with allies) but for now, dont want to deal
            this.players[0].setEnemy(this.players[1]);
            this.players[1].setEnemy(this.players[0]);
        }
        addKillable(killable:any, teamNum:number) {
            this.teams[teamNum].push(killable);
        }
        getAllies(teamNum: number) {
            return this.teams[teamNum];
        }
        getPlayers() {
            return this.players;
        }
        killPlayer(player: Player) {
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
        }

        //checks to be made
        update() {
            for (var i = 0; i < this.teams.length; i++) {
                for (var j = 0; j < this.teams[i].length; j++) {
                    if (this.teams[i][j] instanceof Player && this.teams[i][j].hp <=0) {
                        this.killPlayer(this.teams[i][j]);
                    }
                    else if (this.teams[i][j].hp <= 0) {
                        this.killKillable(this.teams[i][j]); //needs to be implemented
                    }
                }
            }
        }

        killKillable(killable: any) {
            //implement
        }

        
    }
}