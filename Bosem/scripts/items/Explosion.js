var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(game, x, y, damage, size, onTeam) {
            this.xLoc = x - 64;
            this.yLoc = y - 64;
            if (size) {
                this.xLoc = x - size.x / 2;
                this.yLoc = y - size.y / 2;
            }
            _super.call(this, game, this.xLoc, this.yLoc, Bosem.ResKeys.explosionAnimation);
            this.game = game;
            this.game.physics.arcade.enable(this);
            this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20);
            this.actWidth = this.width;
            this.actHeight = this.height;

            if (size) {
                this.scale.x = size.x / this.actWidth;
                this.scale.y = size.y / this.actHeight;
                this.actWidth = size.x;
                this.actHeight = size.y;
            }
            this.game.add.existing(this);
            this.animations.play('explode');

            var killables = Bosem.KillableInGame.getKillables();

            for (var i = 0; i < killables.length; i++) {
                var kill = killables[i];
                if (onTeam) {
                    if (kill.onTeam == onTeam) {
                        break;
                    }
                }
                if (this.intersects(kill)) {
                    kill.recieveDamage(damage);
                }
            }
            this.game.time.events.add(500, this.removeSelf, this);
        }
        Explosion.prototype.removeSelf = function () {
            this.destroy();
        };
        Explosion.prototype.intersects = function (body) {
            if (body.x + body.width <= this.xLoc)
                return false;

            if (body.y + body.height <= this.yLoc)
                return false;

            if (body.x >= this.xLoc + this.actWidth)
                return false;
            if (body.y >= this.yLoc + this.actHeight)
                return false;

            return true;
        };
        return Explosion;
    })(Phaser.Sprite);
    Bosem.Explosion = Explosion;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Explosion.js.map
