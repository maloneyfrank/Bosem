var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Ammo = (function (_super) {
        __extends(Ammo, _super);
        function Ammo(key, lazerShooter) {
            if (lazerShooter.holder.facingLeft)
                _super.call(this, lazerShooter.game, lazerShooter.holder.x - lazerShooter.holder.width, lazerShooter.holder.y + lazerShooter.holder.height / 2, key);
            else
                _super.call(this, lazerShooter.game, lazerShooter.holder.x + 3 + lazerShooter.holder.width, lazerShooter.holder.y + lazerShooter.holder.height / 2, key);
            this.lazerShooter = lazerShooter;
            this.lazerShooter.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.lazerShooter.game.add.existing(this);
            this.spriteBody = this.body;
        }
        Ammo.prototype.hit = function () {
        };
        Ammo.returnAmmoType = function (type, lazerShooter) {
            switch (type) {
                case Ammo.BASIC_AMMO:
                    return new Bosem.BasicAmmo(lazerShooter);
                    break;
                case Ammo.FLAME_AMMO:
                    return new Bosem.FlameAmmo(lazerShooter);
            }
        };
        Ammo.BASIC_AMMO = 0;
        Ammo.FLAME_AMMO = 1;
        return Ammo;
    })(Phaser.Sprite);
    Bosem.Ammo = Ammo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Ammo.js.map
