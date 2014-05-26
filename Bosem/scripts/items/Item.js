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
            //code to be run only once, when the item is picked up by the player
        };
        Item.prototype.effect = function () {
            //to be called whenever this item is activated
        };

        Item.prototype.itemUpdate = function () {
            //called every fram for any continuous effect
        };
        Item.newInstance = function (game, x, y) {
        };

        Item.randomItem = function (game, x, y) {
            var num = Math.floor(Math.random() * 6);
            switch (num) {
                case 0:
                    return new Bosem.Coffee(game, x, y);
                    break;
                case 1:
                    return new Bosem.FlamethrowingFish(game, x, y);
                    break;
                case 2:
                    return new Bosem.Shield(game, x, y);
                    break;
                case 3:
                    return new Bosem.Kamikaze(game, x, y);
                    break;
                case 4:
                    return new Bosem.Tabasco(game, x, y);
                    break;
                case 5:
                    return new Bosem.LazerGun(game, x, y);
                    break;
            }
        };
        return Item;
    })(Phaser.Sprite);
    Bosem.Item = Item;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Item.js.map
