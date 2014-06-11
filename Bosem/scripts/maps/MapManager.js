var Bosem;
(function (Bosem) {
    var MapManager = (function () {
        function MapManager() {
        }
        MapManager.init = function (game) {
            this.game = game;
            this.map = this.game.add.tilemap(Bosem.DefaultMap.mapKey);
            this.map.addTilesetImage(Bosem.DefaultMap.tileSetImageKey, Bosem.DefaultMap.tileSetImageKey);
            this.map.setCollisionByExclusion([]);
            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();

            Bosem.Collidable.setLayer(this.layer);
        };
        MapManager.changeMap = function (map) {
            this.map.destroy();
            this.layer.destroy();
            this.map = this.game.add.tilemap(map.mapKey);
            this.map.addTilesetImage(map.tileSetImageKey, map.tileSetImageKey);
            this.map.setCollisionByExclusion([]);
            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            Bosem.Collidable.setLayer(this.layer);
        };
        return MapManager;
    })();
    Bosem.MapManager = MapManager;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=MapManager.js.map
