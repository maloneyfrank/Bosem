var Bosem;
(function (Bosem) {
    var Camera = (function () {
        function Camera() {
        }
        Camera.init = function (game) {
            this.game = game;
            this.players = Bosem.KillableInGame.getPlayers();
            this.cameraX = this.game.camera.x;
        };
        Camera.update = function () {
            this.cameraX = 0;
            for (var i = 0; i < this.players.length; i++) {
                this.cameraX += this.players[i].x;
            }
            this.cameraX = this.cameraX / this.players.length;

            var moveCamera = true;
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].x < this.game.camera.x + 30) {
                    this.cameraX += 60;
                    if (this.cameraX > this.game.camera.x + this.game.camera.width / 2)
                        moveCamera = false;
                }

                if (this.players[i].x + this.players[i].width > this.game.camera.x + this.game.camera.width - 30 && this.cameraX < this.game.camera.x + this.game.camera.width / 2)
                    moveCamera = false;
            }

            if (moveCamera) {
                this.game.camera.focusOnXY(this.cameraX, this.game.camera.y);
            }
        };
        return Camera;
    })();
    Bosem.Camera = Camera;
})(Bosem || (Bosem = {}));
