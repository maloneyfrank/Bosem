﻿module Bosem {
    export class KillableInGame {

        //adds players in the beginnign of the game
       static players: Player[]; //players in game
       static teams: any[][]; //team of any player
        static game: Phaser.Game;
        
        static init(game:Phaser.Game, numPlayers :number) {
            this.game = game;
            this.players = [];
            this.teams = [];
            for (var i = 0; i < numPlayers; i++) {
                var team: any[] =[];
                var xLoc: number = 300 + 60 * i;
                this.players.push(new Player(this.game,xLoc, 30, i));
                team.push(this.players[i]);
                this.teams.push(team);
                Collidable.addCollidable(this.players[i]);
            }


           
        }
       static addKillable(killable:Killable, teamNum:number) {
           this.teams[teamNum].push(killable);
           Collidable.addCollidable(killable);
        }
        static getAllies(teamNum: number) {
            return this.teams[teamNum];
        }
        static getPlayers() {
            return this.players;
        }
        static getPlayersGroup() {
            var group: Phaser.Group = new Phaser.Group(this.game);
            for(var i = 0; i < this.players.length; i++){
                group.add(this.players[i]);
             }
            return group;
        }
        static  killPlayer(player: Player) {
            if (player.canDie) {
                if (player.lives > 1) {
                    player.canDie = false;
                    this.locationStuff(player);
                    player.lives--;
                    var killed = player;
                    player.kill();
                    player.hp = Player.MAX_HP;
                    this.game.time.events.add(1000, function () {
                        killed.revive();
                        killed.canDie = true;
                        var position: number = Math.floor(killed.game.camera.x + (Math.random() * killed.game.camera.width));
                        killed.position.set(position, 0);
                        killed.checkWorldBounds = true;
                        killed.canDie = true;
                    },
                        this);
                } else {
                    this.endGame(player.onTeam);
                }
            }
        }
        static endGame(onTeam: number) { //isnt checking for ties currently
            localStorage.clear();
            //stores loser   
            localStorage.setItem('loser', onTeam.toString());
            localStorage.setItem('numPlayers', KillableInGame.players.length.toString());
            for (var i = 0; i < KillableInGame.players.length; i++) {
                var itemResKeys: string = "";
                for (var j = 0; j < KillableInGame.players[i].heldItems.length; j++) {
                    itemResKeys += KillableInGame.players[i].heldItems[j] + "|";
                }
                localStorage.setItem("playerItems" + i.toString(), itemResKeys);
            }

            this.game.state.start(ResKeys.endGameState, true, false);
        }
        static locationStuff(player: Player){
            var x = player.x;
            var y = player.y;
            player.x = -500;
            player.y = -500;
            ItemManager.spawnItem(x, y);
        }

        //checks to be made
        static  update() {
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

        static   killKillable(killable: any) {
            //implement
        }
        static getKillables() {
            var killables: Killable[] = [];
            for (var i = 0; i < this.teams.length; i++) {
               killables = killables.concat(this.teams[i]);
            }
            return killables;
        }
        
    }
}