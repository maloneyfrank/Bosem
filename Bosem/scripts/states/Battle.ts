module Bosem {
    export class Battle extends Phaser.State {
        map: Phaser.Tilemap;
        layer: Phaser.TilemapLayer;
        
        players: Player[];
        healthBar1: Phaser.Sprite;
        healthBar2: Phaser.Sprite;
        create() {
            this.game.stage.backgroundColor = '#00BFFF';
            Collidable.init(this.game);
            KillableInGame.init(this.game, 2);
            HUD.init(this.game);
            this.map = this.game.add.tilemap(ResKeys.map1);
            this.map.addTilesetImage('tiles1','tiles1');
            this.map.setCollisionByExclusion([]);

            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            Collidable.addCollidable(this.layer);
            
            this.players = KillableInGame.getPlayers();
            Camera.init(this.game);
            ItemManager.init(this.game, ItemManager.ON_TIME_INTERVAL_AND_SPAWN);
    
            
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
            HUD.displayHud();
            Camera.update();
        }
        
        
    }
} 