module Bosem {
    export class MapManager {

        static map: Phaser.Tilemap;
        static layer: Phaser.TilemapLayer;
        static game: Phaser.Game;
        static init(game: Phaser.Game) {
            this.game = game;
            this.map = this.game.add.tilemap(DefaultMap.mapKey);
            this.map.addTilesetImage(DefaultMap.tileSetImageKey, DefaultMap.tileSetImageKey);
            this.map.setCollisionByExclusion([]);
            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            
            Collidable.setLayer(this.layer);
        }
        static changeMap(map: any) {
            this.map.destroy();
            this.layer.destroy();
            this.map = this.game.add.tilemap(map.mapKey);
            this.map.addTilesetImage(map.tileSetImageKey, map.tileSetImageKey);
            this.map.setCollisionByExclusion([]);
            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            Collidable.setLayer(this.layer);
        }
    }
}