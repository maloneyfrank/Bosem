module Bosem{
    export class HUD {

        static game: Phaser.Game;

        static healthHearts: Phaser.Image[][];
        static heartFills: Phaser.Image[][];
       static cropRects: Phaser.Rectangle[];
        static init(game: Phaser.Game) {
            this.game = game;
    


            this.healthHearts = [];
            this.heartFills = [];
            this.cropRects = [];
            //currently only set up for 2 players but only because of placement...will work with more players but will not display
            for (var i = 0; i < KillableInGame.players.length; i++) {
                this.healthHearts.push(new Array<Phaser.Sprite>());
                this.heartFills.push(new Array<Phaser.Sprite>());
                this.cropRects.push(new Phaser.Rectangle(0, 0, 0, 0));
                for (var j = 0; j < KillableInGame.players[i].lives; j++) {
                    if (i == 0) {
                        this.heartFills[i].push(new Phaser.Image(this.game, j * 60, 0, ResKeys.heartFill,0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, j * 60, 0, ResKeys.heartPic,0));
                    }
                    if(i ==1) {
                        this.heartFills[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartFill,0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartPic,0));
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

                    this.healthHearts[i].pop();
                    this.heartFills[i].pop();
                }
                var currentHeart: Phaser.Image = this.heartFills[i][this.heartFills[i].length - 1];
                this.cropRects[i] = new Phaser.Rectangle(currentHeart.x,currentHeart.y, currentHeart.width-10,currentHeart.height-10);
                currentHeart.crop(this.cropRects[i]);
                currentHeart.position.y = 56 - currentHeart.height;
             
            }

        }
    }
} 