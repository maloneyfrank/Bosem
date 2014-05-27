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

            Bosem.Collidable.init(this.game);
            Bosem.KillableInGame.init(this.game, 2);

            this.map = this.game.add.tilemap(Bosem.ResKeys.map1);
            this.map.addTilesetImage('tiles1', 'tiles1');
            this.map.setCollisionByExclusion([]);

            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();
            Bosem.Collidable.addCollidable(this.layer);
            this.itemsInGame = this.game.add.group();

            this.players = Bosem.KillableInGame.getPlayers();

            var timer = this.game.time.create(false);
            timer.loop(5000, this.additem, this);
            timer.start();

            this.healthBar1 = this.game.add.sprite(0, 0, Bosem.ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, Bosem.ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
        };
        Battle.prototype.update = function () {
            for (var i = 0; i < this.players.length; i++) {
                //check for collision with map
                this.game.physics.arcade.collide(this.players[i], this.layer);
                for (var j = 0; j < this.players.length; j++) {
                    //check for cillsion with other players
                    if (j != i) {
                        this.game.physics.arcade.collide(this.players[i], this.players[j]);
                    }
                }
            }
            Bosem.KillableInGame.update();

            this.game.physics.arcade.collide(this.itemsInGame, this.layer);
            this.itemsInGame.forEach(this.itemCheck, this);

            //should be put in for loop...deal with later in hud
            this.healthBar1.scale.x = this.players[0].hp / 1000;
            this.healthBar2.scale.x = this.players[1].hp / 1000;
        };
        Battle.prototype.additem = function () {
            var x = Math.floor(Math.random() * this.game.world.width);
            this.itemsInGame.add(Bosem.Item.randomItem(this.game, x, 10));
        };
        Battle.prototype.itemCheck = function (item) {
            for (var i = 0; i < this.players.length; i++) {
                if (this.game.physics.arcade.collide(item, this.players[i])) {
                    item.init(this.players[i]);
                    this.itemsInGame.remove(item);
                }
            }
        };
        return Battle;
    })(Phaser.State);
    Bosem.Battle = Battle;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Battle.js.map
