var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var FlamethrowingFish = (function (_super) {
        __extends(FlamethrowingFish, _super);
        function FlamethrowingFish(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.fishSprite);
            this.dmg = 5;
            this.range = 1;
            this.attackSpeed = 3500;
            this.animations.add(Bosem.ResKeys.fishRight, [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1], 20, true);
            this.animations.add(Bosem.ResKeys.fishLeft, [8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9], 20, true);
        }
        FlamethrowingFish.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            holder.heldItems.push(this);
            holder.effectItems.push(this);
            this.hp = 500;
            this.game.add.existing(this);
            this.spriteBody.acceleration.y = 0;

            this.setMovement();
            var fishTimer = this.game.time.create(false);
            fishTimer.loop(2000, this.setMovement, this);
            fishTimer.start();

            this.lazerShooter = new Bosem.LazerShooter(this.game, this, Bosem.Ammo.FLAME_AMMO, this.onTeam);
        };
        FlamethrowingFish.prototype.itemUpdate = function () {
            this.checkAttack();
        };
        FlamethrowingFish.prototype.setMovement = function () {
            this.spriteBody.acceleration.setTo(0, 0);
            this.spriteBody.velocity.setTo(0, 0);
            this.toX = Math.floor(Math.random() * 5) + this.holder.x;
            this.toY = Math.floor(Math.random() * this.holder.height) + this.holder.y;
            this.game.physics.arcade.accelerateToXY(this, this.toX, this.toY);
            if (this.toX > this.x) {
                this.animations.play(Bosem.ResKeys.fishRight);
                this.facingLeft = false;
            } else {
                this.animations.play(Bosem.ResKeys.fishLeft);
                this.facingLeft = true;
            }
        };

        FlamethrowingFish.prototype.checkAttack = function () {
            var attack = Math.floor(Math.random() * 10);
            if (attack == 1)
                this.attack();
        };
        FlamethrowingFish.prototype.attack = function () {
            this.lazerShooter.attack();
        };
        return FlamethrowingFish;
    })(Bosem.Item);
    Bosem.FlamethrowingFish = FlamethrowingFish;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Ftf.js.map
