module Bosem{
    export class HUD {

        static game: Phaser.Game;
        //heart stuff
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
                    if (j == KillableInGame.players[i].lives - 1) {
                        //loads the different heart image that can be cropped for the last one
                        if (i == 0) {
                            this.heartFills[i].push(new Phaser.Image(this.game, j * 60, 0, 'heartFill'+i, 0));
                            this.healthHearts[i].push(new Phaser.Image(this.game, j * 60, 0, ResKeys.heartPic, 0));
                        }
                        if (i == 1) {
                            this.heartFills[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, 'heartFill' +i, 0));
                            this.healthHearts[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartPic, 0));
                        }
                    } else {
                        //loads uncroppable image
                        if (i == 0) {
                            this.heartFills[i].push(new Phaser.Image(this.game, j * 60, 0, ResKeys.heartFill, 0));
                            this.healthHearts[i].push(new Phaser.Image(this.game, j * 60, 0, ResKeys.heartPic, 0));
                        }
                        if (i == 1) {
                            this.heartFills[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartFill, 0));
                            this.healthHearts[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, ResKeys.heartPic, 0));
                        }
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
                    var position = this.heartFills[i][this.heartFills[i].length - 1].position;
                    this.heartFills[i][this.heartFills[i].length - 1].destroy();
                    this.heartFills[i][this.heartFills[i].length - 1] = this.game.add.image(position.x, position.y, 'heartFill' + i);
                    this.heartFills[i][this.heartFills[i].length - 1].crop(null);
                }
                var currentHeart: Phaser.Image = this.heartFills[i][this.heartFills[i].length - 1];
                var height: number = 55 * KillableInGame.players[i].hp / 1000;
                //56 is height of picture
                this.cropRects[i] = new Phaser.Rectangle(0,56- height, currentHeart.width, height);
                currentHeart.crop(null);
                currentHeart.crop(this.cropRects[i]);
                
             
            }

        }
    }
} 