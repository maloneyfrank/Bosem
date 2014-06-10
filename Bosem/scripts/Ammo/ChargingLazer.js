var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var ChargingLazer = (function (_super) {
        __extends(ChargingLazer, _super);
        function ChargingLazer(lazerShooter) {
            _super.call(this, Bosem.ResKeys.chargingBall, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.height / 2);
            this.notReleased = true;
            this.size = 0;
            this.initialHeight = this.height;
            this.initialWidth = this.width;
            this.game.time.events.add(10000, this.lazerShooter.resetShoot, this);
        }
        ChargingLazer.prototype.update = function () {
            if (this.notReleased) {
                if (this.lazerShooter.holder.attackKey.isDown) {
                    this.size++;
                    if (this.size > 300)
                        this.size = 300;
                    this.height = this.initialHeight + Math.floor(this.size / 10);
                    this.width = this.initialWidth + Math.floor(this.size / 10);
                    this.y = this.lazerShooter.holder.y + this.lazerShooter.holder.height / 2 - this.height / 2;
                    if (this.lazerShooter.holder.facingLeft)
                        this.x = this.lazerShooter.holder.x - this.width;
                    else
                        this.x = this.lazerShooter.holder.x + this.lazerShooter.holder.width;
                } else {
                    this.notReleased = false;
                    this.initialHeight = this.height;
                    this.initialWidth = this.width;
                }
            } else {
                if (this.lazerShooter.holder.facingLeft) {
                    this.width = 768 * this.size / 450;
                    this.x = this.lazerShooter.holder.x - this.width;
                } else {
                    this.width = 768 * this.size / 450;
                    this.x = this.lazerShooter.holder.x + this.lazerShooter.holder.width;
                }

                this.height = this.initialHeight * this.size / 500;
                this.y = this.lazerShooter.holder.y + this.lazerShooter.holder.height / 2 - this.height / 2;
                this.game.time.events.add(150, this.killSelf, this);
            }
        };
        ChargingLazer.prototype.getAttackSpeed = function () {
            return -10;
        };
        ChargingLazer.prototype.hitSomething = function (something) {
            if (something != this.lazerShooter.holder) {
                this.killSelf();
            }
        };

        ChargingLazer.prototype.hitByBullet = function (bullet) {
            this.killSelf();
        };

        ChargingLazer.prototype.getDamage = function () {
            if (this.notReleased)
                this.dmg = 2;
            else
                this.dmg = this.lazerShooter.holder.dmg * this.size / 8;

            return this.dmg;
        };
        ChargingLazer.prototype.getRange = function () {
            return -1;
        };
        ChargingLazer.prototype.killSelf = function () {
            this.killBullet = true;
            this.lazerShooter.resetShoot();
        };
        return ChargingLazer;
    })(Bosem.Ammo);
    Bosem.ChargingLazer = ChargingLazer;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=ChargingLazer.js.map
