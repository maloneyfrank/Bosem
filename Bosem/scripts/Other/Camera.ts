module Bosem {
    export class Camera {
       static game: Phaser.Game;
        static players: Player[];
        static cameraX:number;
        static cameraY:number;
        static init(game:Phaser.Game) {
            this.game = game;
            this.players = KillableInGame.getPlayers();
            this.cameraX = this.game.camera.x;
            this.cameraY = this.game.camera.y;

        }
        static update() {
            this.cameraX = 0;
            this.cameraY = 0;
            for (var i = 0; i < this.players.length; i++) {
                //get the point in the middle of all the players by averaging all x and y coordinates
                this.cameraX += this.players[i].x;
                this.cameraY += this.players[i].y;
            }
            this.cameraX = this.cameraX / this.players.length;

            var moveCamera: boolean = true;
            for (var i = 0; i < this.players.length; i++) {
                //checks left
                if (this.players[i].x < this.game.camera.x + 30 && this.cameraX < this.game.camera.x - this.game.camera.width / 2) 
                    moveCamera = false;
                //checks right
                if (this.players[i].x + this.players[i].width > this.game.camera.x + this.game.camera.width - 30 && this.cameraX < this.game.camera.x + this.game.camera.width / 2)
                    moveCamera = false;
            }

            if(moveCamera) this.game.camera.focusOnXY(this.cameraX, this.game.camera.y);

          

        }

    }
} 