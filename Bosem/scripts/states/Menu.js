var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.preload = function () {
            this.game.add.image(0, 0, Bosem.ResKeys.menuImage1);
            this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        };
        Menu.prototype.create = function () {
            var tween = this.add.tween(Bosem.ResKeys.menuImage2).to({ y: 500 }, 5000, Phaser.Easing.Bounce.InOut, true);

            this.sprite2 = this.game.add.image(this.game.world.centerX, -50, Bosem.ResKeys.menuImage2);

            // Set origin to the center to make the rotation look better.
            this.sprite2.anchor.setTo(0.5, 0.5);

            // Add a simple bounce tween to each character's position.
            tween = this.game.add.tween(this.sprite2).to({ y: 500 }, 2400, Phaser.Easing.Bounce.Out, true);

            this.game.add.image(0, 0, Bosem.ResKeys.controlsPic);
        };

        Menu.prototype.update = function () {
            if (this.enter.isDown) {
                this.game.state.start(Bosem.ResKeys.battleState);
            }
        };
        return Menu;
    })(Phaser.State);
    Bosem.Menu = Menu;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Menu.js.map
