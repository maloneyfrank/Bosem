var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var BottleOfJack = (function (_super) {
        __extends(BottleOfJack, _super);
        function BottleOfJack(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.bottleOfJack);
        }
        BottleOfJack.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            this.keys = [];
            this.keys.push(holder.moveLeft.keyCode);
            this.keys.push(holder.moveRight.keyCode);
            this.keys.push(holder.attackKey.keyCode);
            this.keys.push(holder.jump.keyCode);

            var num = Math.floor(Math.random() * 4);
            holder.moveLeft = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.moveRight = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.attackKey = this.game.input.keyboard.addKey(this.keys[num]);
            var num = Math.floor(Math.random() * 4);
            holder.jump = this.game.input.keyboard.addKey(this.keys[num]);

            this.reload = this.game.add.image(this.holder.x, this.holder.y, Bosem.ResKeys.redBar);
            this.game.add.tween(this.reload).from({ height: 1 }, 4900, Phaser.Easing.Linear.None, true);
            this.game.time.events.add(5000, this.resetKeys, this);

            holder.incrementMoveSpeed(100);
            holder.shields += 3;
        };
        BottleOfJack.prototype.resetKeys = function () {
            this.holder.moveLeft = this.game.input.keyboard.addKey(this.keys[0]);
            this.holder.moveRight = this.game.input.keyboard.addKey(this.keys[1]);
            this.holder.attackKey = this.game.input.keyboard.addKey(this.keys[2]);
            this.holder.jump = this.game.input.keyboard.addKey(this.keys[3]);
            this.holder.incrementMoveSpeed(-120);
            this.reload.texture = null;
            this.reload.destroy();
        };
        return BottleOfJack;
    })(Bosem.Item);
    Bosem.BottleOfJack = BottleOfJack;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=BottleOfJack.js.map
