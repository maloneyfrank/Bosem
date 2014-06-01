module Bosem{
    export class HUD {

        static game: Phaser.Game;

        static healthHearts: Phaser.Sprite[][];
        static heartFills: Phaser.Sprite[][];
        static init(game: Phaser.Game) {
            this.game = game;
    


            this.healthHearts = [];
            this.heartFills = [];
            //currently only set up for 2 players but only because of placement...will work with more players but will not display
            for (var i = 0; i < KillableInGame.players.length; i++) {
                this.healthHearts.push(new Array<Phaser.Sprite>());
                this.heartFills.push(new Array<Phaser.Sprite>());
                for (var j = 0; j < KillableInGame.players[i].lives; j++) {
                    if (i == 0) {
                        this.heartFills[i].push(new Phaser.Sprite(this.game, j * 60, 0, ResKeys.heartFill));
                        this.healthHearts[i].push(new Phaser.Sprite(this.game, j * 60, 0, ResKeys.heartPic));
                    }
                    if(i ==1) {
                        this.heartFills[i].push(new Phaser.Sprite(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartFill));
                        this.healthHearts[i].push(new Phaser.Sprite(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartPic));
                    }
                    this.game.add.existing(this.healthHearts[i][j]);
                    this.game.add.existing(this.heartFills[i][j]);
                }  
            }
        } 

        static displayHud() {
            this.dispayHealth();
        }
        static dispayHealth() {


            for (var i = 0; i < KillableInGame.players.length; i++) {
                if (this.healthHearts[i].length > KillableInGame.players[i].lives) {
                    this.healthHearts[i][this.healthHearts[i].length - 1].destroy();
                    this.heartFills[i][this.heartFills[i].length - 1].destroy();

                    this.healthHearts[i].splice(this.healthHearts.length[i] - 1, 1);
                    this.heartFills[i].splice(this.heartFills.length[i] - 1, 1);
                }
                this.heartFills[i][this.heartFills[i].length - 1].height = 56 * KillableInGame.players[i].hp / 1000;
                this.heartFills[i][this.heartFills[i].length - 1].position.y = 56 - this.heartFills[i][this.heartFills[i].length - 1].height;
                
            }

        }
    }
} 