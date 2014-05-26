var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle() {
            _super.apply(this, arguments);
        }
        Battle.prototype.create = function () {
            this.game.stage.backgroundColor = '#00BFFF';
            this.player1 = new Bosem.Player(this.game, 10, 10, 1);
            this.player2 = new Bosem.Player(this.game, 800, 10, 2);
            this.player1.setEnemy(this.player2);
            this.player2.setEnemy(this.player1);
            this.map = this.game.add.tilemap(Bosem.ResKeys.map1);
            this.map.addTilesetImage('tiles1', 'tiles1');
            this.map.setCollisionByExclusion([]);

            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();

            this.itemsInGame = this.game.add.group();

            var timer = this.game.time.create(false);
            timer.loop(5000, this.additem, this);
            timer.start();
            this.healthBar1 = this.game.add.sprite(0, 0, Bosem.ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, Bosem.ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
        };
        Battle.prototype.update = function () {
            this.game.physics.arcade.collide(this.player1, this.layer);
            this.game.physics.arcade.collide(this.player2, this.layer);
            this.game.physics.arcade.collide(this.itemsInGame, this.layer);
            this.game.physics.arcade.collide(this.player1, this.player2);
            this.itemsInGame.forEach(this.itemCheck, this);
            this.healthBar1.scale.x = this.player1.hp / 1000;
            this.healthBar2.scale.x = this.player2.hp / 1000;
        };
        Battle.prototype.additem = function () {
            var x = Math.floor(Math.random() * this.game.world.width);
            this.itemsInGame.add(Bosem.Item.randomItem(this.game, x, 10));
        };
        Battle.prototype.itemCheck = function (item) {
            if (this.game.physics.arcade.collide(item, this.player1)) {
                item.init(this.player1);
                this.itemsInGame.remove(item);
            }
            if (this.game.physics.arcade.collide(item, this.player2)) {
                item.init(this.player2);
                this.itemsInGame.remove(item);
            }
        };
        return Battle;
    })(Phaser.State);
    Bosem.Battle = Battle;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Battle.js.map
