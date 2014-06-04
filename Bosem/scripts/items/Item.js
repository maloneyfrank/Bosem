var __extends = this.__extends || function (d, b) {
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
            //code to be run only once, when the item is picked up by the player
        };
        Item.prototype.effect = function () {
            //to be called whenever this item is activated
        };

        Item.prototype.itemUpdate = function () {
            //called every fram for any continuous effect
        };
        Item.prototype.hitByBullet = function (bullet) {
        };

        Item.init = function () {
            this.allItems.push(Bosem.Coffee);
            this.allItems.push(Bosem.Kamikaze);
            this.allItems.push(Bosem.LazerGun);
            this.allItems.push(Bosem.Shield);
            this.allItems.push(Bosem.SniperGun);
            this.allItems.push(Bosem.Radar);
        };

        Item.randomItem = function (game, x, y) {
            while (true) {
                return new Bosem.Radar(game, x, y);
                /*
                var randItem: number = Math.floor(Math.random() * this.allItems.length);
                var dropped: number = Math.random() * 100;
                if (this.allItems[randItem].dropRate > dropped)
                return new this.allItems[randItem](game, x, y);*/
            }
        };
        Item.allItems = [];

        Item.dropRate = 50;
        return Item;
    })(Phaser.Sprite);
    Bosem.Item = Item;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Item.js.map
