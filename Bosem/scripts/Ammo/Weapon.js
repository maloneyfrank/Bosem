var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.game = game;
            this.game.add.existing(this);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 1000;
        }
        Weapon.prototype.attack = function () {
            //called whenever the player hits the attack key...
        };
        Weapon.prototype.pickup = function (player, enemy) {
            this.holder = player;
            this.enemy = enemy;
            this.held = true;
            this.spriteBody.acceleration.y = 0;
            //called when player picks up weapon
        };
        Weapon.prototype.dropped = function () {
            //called when player drops weapon
            this.holder = null;
            this.enemy = null;
            this.held = false;
            this.spriteBody.acceleration.y = 1000;
        };

        Weapon.randomWeapon = function (game) {
        };
        Weapon.SWORD = 1;
        Weapon.GUN = 2;
        return Weapon;
    })(Phaser.Sprite);
    Bosem.Weapon = Weapon;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Weapon.js.map
