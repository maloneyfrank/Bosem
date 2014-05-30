module Bosem{
    export class HUD {

        static game: Phaser.Game;
        static healthBar1: Phaser.Sprite;
        static healthBar2: Phaser.Sprite;

        static init(game: Phaser.Game) {
            this.game = game;
            this.healthBar1 = this.game.add.sprite(0, 0, ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
        } 

        static dispayHealth() {
            this.healthBar1.scale.x = KillableInGame.players[0].hp / 1000;
            this.healthBar2.scale.x = KillableInGame.players[1].hp / 1000;
        }
    }
} 