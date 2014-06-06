module Bosem {
    export class ItemManager{
        static game: Phaser.Game;
        static type: number; //Keeps track of the type of system that should be running
        static maxItems: number = 5;

        static ON_SPAWN = 1; //will drop item on death of player
        static ON_TIME_INTERVAL: number = 0; //will drop item on interval
        static ON_TIME_INTERVAL_AND_SPAWN = 2; //interval+spawn

        static timeInterval: number =5000; //interval for item drop if this is th type
        static timer: Phaser.Timer;

        static itemsInGame: Phaser.Group; //items in the game

        static init(game: Phaser.Game, type: number) {
            this.game = game;
            this.type = type;

            this.itemsInGame = this.game.add.group();
            switch (this.type) {
                case this.ON_TIME_INTERVAL:
                    this.timer = this.game.time.create(false);
                    this.timer.loop(this.timeInterval, this.onTimeInterval, this);
                    this.timer.start();
                    break;
                case this.ON_TIME_INTERVAL_AND_SPAWN:
                    this.timer = this.game.time.create(false);
                    this.timer.loop(this.timeInterval, this.onTimeInterval, this);
                    this.timer.start();
                    break;
            }
        }
        static setTimeInterval(newTimeInterval: number) {
            this.timeInterval = newTimeInterval;
            this.timer.stop();
            this.timer.destroy;
            this.timer = this.game.time.create(false);
            this.timer.loop(this.timeInterval, this.onTimeInterval, this);
            this.timer.start();
        }
        static update() {
            this.itemsInGame.forEach(this.itemGetCheck, this);
        }

        static itemGetCheck(item: Item) {
            var players: Player[] = KillableInGame.getPlayers();
            for (var i = 0; i < players.length; i++) {
                if (this.game.physics.arcade.collide(item, players[i])) {
                    item.init(players[i]);
                    this.itemsInGame.remove(item);
                }
            }
        }

       static onTimeInterval() {
           var x: number = Math.floor(this.game.camera.x + (Math.random() * this.game.camera.width));
           if (this.itemsInGame.length < ItemManager.maxItems) {
               this.itemsInGame.add(Item.randomItem(this.game, x, 10));
           }
       }

  
        static spawnItem(x:number, y:number) {
            if (this.itemsInGame.length < ItemManager.maxItems && (this.type == this.ON_SPAWN || this.type == this.ON_TIME_INTERVAL_AND_SPAWN)) {
                this.itemsInGame.add(Item.randomItem(this.game, x, y));
            }
        }
        
    }
} 