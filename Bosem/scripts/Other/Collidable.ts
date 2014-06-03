module Bosem {
    export class Collidable {
        //maybe we should add a noBodyColidables so we could intersects?
      static  collidables: Phaser.Group;
        static  game: Phaser.Game;
       
        static init(game: Phaser.Game) {
            this.game = game;
            this.collidables = this.game.add.group();
        }
        static addCollidable(collidable: any) {
            this.collidables.add(collidable);
        }
        
        static removeCollidable(collidable: any) {
            collidable.destroy();
            this.collidables.remove(collidable,true);
        }
        static getCollidables() {
            return this.collidables;
        }
    }
} 