﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 100;
            this.game.add.existing(this);
        }
        Item.prototype.init = function (holder) {
            this.holder = holder;
            this.onTeam = holder.onTeam;
        };
        Item.prototype.effect = function () {
        };

        Item.prototype.itemUpdate = function () {
        };
        Item.prototype.hitByBullet = function (bullet) {
        };
        Item.randomItem = function (game, x, y) {
            var num = Math.floor(Math.random() * 5);
            switch (num) {
                case 0:
                    return new Bosem.Coffee(game, x, y);
                    break;
                case 1:
                    return new Bosem.SniperGun(game, x, y);
                    break;
                case 2:
                    return new Bosem.Shield(game, x, y);
                    break;
                case 3:
                    return new Bosem.Kamikaze(game, x, y);
                    break;
                case 4:
                    return new Bosem.LazerGun(game, x, y);
                    break;
            }
        };
        return Item;
    })(Phaser.Sprite);
    Bosem.Item = Item;
})(Bosem || (Bosem = {}));
