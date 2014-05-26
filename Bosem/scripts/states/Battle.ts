module Bosem {
    export class Battle extends Phaser.State {
        player1: Player;
        player2: Player;
        map: Phaser.Tilemap;
        layer: Phaser.TilemapLayer;
        itemsInGame: Phaser.Group;
        healthBar1: Phaser.Sprite;
        healthBar2: Phaser.Sprite;
        create() {
            this.game.stage.backgroundColor ='#00BFFF'
            this.player1 = new Player(this.game,10,10, 1);
            this.player2 = new Player(this.game, 800, 10, 2);
            this.player1.setEnemy(this.player2);
            this.player2.setEnemy(this.player1);
            this.map = this.game.add.tilemap(ResKeys.map1);
            this.map.addTilesetImage('tiles1','tiles1');
            this.map.setCollisionByExclusion([]);

            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();

            this.itemsInGame = this.game.add.group();

            var timer: Phaser.Timer = this.game.time.create(false);
            timer.loop(5000, this.additem, this);
            timer.start();
            this.healthBar1 = this.game.add.sprite(0, 0, ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
            
        }
        update() {
            this.game.physics.arcade.collide(this.player1, this.layer);
            this.game.physics.arcade.collide(this.player2, this.layer);
            this.game.physics.arcade.collide(this.itemsInGame, this.layer);
            this.game.physics.arcade.collide(this.player1, this.player2);
            this.itemsInGame.forEach(this.itemCheck, this);
            this.healthBar1.scale.x = this.player1.hp / 1000;
            this.healthBar2.scale.x = this.player2.hp / 1000;

        }
        additem() {
            var x: number = Math.floor(Math.random() * this.game.world.width);
            this.itemsInGame.add(Item.randomItem(this.game, x, 10));
        }
        itemCheck(item: Item) {
            if (this.game.physics.arcade.collide(item, this.player1)) {
                item.init(this.player1);
                this.itemsInGame.remove(item);
            }
            if (this.game.physics.arcade.collide(item, this.player2)) {
                item.init(this.player2);
                this.itemsInGame.remove(item);
            }
        }
    }
} 