module Bosem {
    export class Camera {
       static game: Phaser.Game;
        static players: Player[];
        static cameraX:number;
        static init(game:Phaser.Game) {
            this.game = game;
            this.players = KillableInGame.getPlayers();
            this.cameraX = this.game.camera.x;

        }
        static update() {
            this.cameraX = 0;
            var divideBy: number =0;
            for (var i = 0; i < this.players.length; i++) {
                //get the point in the middle of all the players by averaging all x and y coordinates
                if (this.players[i].canDie) {
                    this.cameraX += this.players[i].x;
                    divideBy++;
                }
                
            }
            this.cameraX = this.cameraX / divideBy;

            var moveCamera: boolean = true;
            for (var i = 0; i < this.players.length; i++) {
                //checks left
                if (this.players[i].x < this.game.camera.x + 30) {
                    this.cameraX += 60;
                    if (this.cameraX > this.game.camera.x + this.game.camera.width / 2)
                        moveCamera = false;
                }
                //checks right
                if (this.players[i].x + this.players[i].width > this.game.camera.x + this.game.camera.width - 30 && this.cameraX < this.game.camera.x + this.game.camera.width / 2)
                    moveCamera = false;
            }

            if (moveCamera) {
                this.game.camera.focusOnXY(this.cameraX, this.game.camera.y);
              
            }
          

        }

    }
} 