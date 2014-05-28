module Bosem {
    export class Battle extends Phaser.State {
        map: Phaser.Tilemap;
        layer: Phaser.TilemapLayer;
        
        players: Player[];
        healthBar1: Phaser.Sprite;
        healthBar2: Phaser.Sprite;
        create() {
            this.game.stage.backgroundColor = '#00BFFF'
           
            Collidable.init(this.game);
            KillableInGame.init(this.game, 2);

            this.map = this.game.add.tilemap(ResKeys.map1);
            this.map.addTilesetImage('tiles1','tiles1');
            this.map.setCollisionByExclusion([]);

            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            Collidable.addCollidable(this.layer);

            this.players = KillableInGame.getPlayers();
            ItemManager.init(this.game, ItemManager.ON_TIME_INTERVAL_AND_SPAWN);
            

            this.healthBar1 = this.game.add.sprite(0, 0, ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
            
        }
        update() {
            for (var i = 0; i < this.players.length; i++) {
                //check for collision with map
                this.game.physics.arcade.collide(this.players[i], this.layer);
                for (var j = 0; j < this.players.length; j++) {
                    //check for cillsion with other players
                    if (j != i) {//dont want to check self
                        this.game.physics.arcade.collide(this.players[i], this.players[j]);
                    }
                }
            }
            KillableInGame.update();
            ItemManager.update();
            this.game.physics.arcade.collide(ItemManager.itemsInGame, this.layer);
            

            //should be put in for loop...deal with later in hud
            this.healthBar1.scale.x = this.players[0].hp / 1000;
            this.healthBar2.scale.x = this.players[1].hp / 1000;

        }
        
        
    }
} 