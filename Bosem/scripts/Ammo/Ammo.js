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
        function Ammo(key, lazerShooter, y) {
            if (lazerShooter.holder.facingLeft)
                _super.call(this, lazerShooter.game, lazerShooter.holder.x - lazerShooter.holder.width, y, key);
            else
                _super.call(this, lazerShooter.game, lazerShooter.holder.x + lazerShooter.holder.width, y, key);
            this.lazerShooter = lazerShooter;
            this.lazerShooter.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.lazerShooter.game.add.existing(this);
            this.spriteBody = this.body;
            this.onTeam = lazerShooter.onTeam;
            this.distanceMoved = 0;
            this.oldX = this.x;
            this.killBullet = false;
        }
        Ammo.prototype.getDamage = function () {
            return this.dmg;
        };
        Ammo.returnAmmoType = function (type, lazerShooter) {
            switch (type) {
                case Ammo.BASIC_AMMO:
                    return new Bosem.BasicAmmo(lazerShooter);
                    break;
                case Ammo.HOMING_MISSLE:
                    return new Bosem.HomingMissle(lazerShooter);
                    break;
                case Ammo.SNIPER_AMMO:
                    return new Bosem.SniperAmmo(lazerShooter);
                    break;
                case Ammo.CHARGING_LAZER:
                    return new Bosem.ChargingLazer(lazerShooter);
                    break;
                case Ammo.BOOMERANG_AMMO:
                    return new Bosem.BoomerangAmmo(lazerShooter);
                    break;
            }
        };
        Ammo.prototype.getAttackSpeed = function () {
            return 3500;
        };
        Ammo.prototype.hitByBullet = function (bullet) {
        };
        Ammo.prototype.hitSomething = function (something) {
            this.destroy();
            this.killBullet = true;
        };
        Ammo.prototype.getRange = function () {
            return 500;
        };
        Ammo.prototype.getDistanceMoved = function () {
            return this.distanceMoved;
        };
        Ammo.prototype.updateDistanceMoved = function () {
            if (this.x > this.oldX)
                this.distanceMoved += this.x - this.oldX;
            else
                this.distanceMoved += this.oldX - this.x;
            this.oldX = this.x;
        };
        Ammo.BASIC_AMMO = 0;
        Ammo.HOMING_MISSLE = 1;
        Ammo.SNIPER_AMMO = 2;
        Ammo.CHARGING_LAZER = 3;
        Ammo.BOOMERANG_AMMO = 4;
        return Ammo;
    })(Phaser.Sprite);
    Bosem.Ammo = Ammo;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Ammo.js.map
