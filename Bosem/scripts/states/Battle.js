﻿var __extends = this.__extends || function (d, b) {
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

            this.players = Bosem.KillableInGame.getPlayers();
            Bosem.ItemManager.init(this.game, Bosem.ItemManager.ON_TIME_INTERVAL_AND_SPAWN);

            this.healthBar1 = this.game.add.sprite(0, 0, Bosem.ResKeys.player1Health);
            this.healthBar1.scale.y = 2;
            this.healthBar2 = this.game.add.sprite(512, 0, Bosem.ResKeys.player2Health);
            this.healthBar2.scale.y = 2;
        };
        Battle.prototype.update = function () {
            for (var i = 0; i < this.players.length; i++) {
                this.game.physics.arcade.collide(this.players[i], this.layer);
                for (var j = 0; j < this.players.length; j++) {
                    if (j != i) {
                        this.game.physics.arcade.collide(this.players[i], this.players[j]);
                    }
                }
            }
            Bosem.KillableInGame.update();
            Bosem.ItemManager.update();
            this.game.physics.arcade.collide(Bosem.ItemManager.itemsInGame, this.layer);

            this.healthBar1.scale.x = this.players[0].hp / 1000;
            this.healthBar2.scale.x = this.players[1].hp / 1000;
        };
        return Battle;
    })(Phaser.State);
    Bosem.Battle = Battle;
})(Bosem || (Bosem = {}));
