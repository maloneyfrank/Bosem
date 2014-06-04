var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var HomingMissle = (function (_super) {
        __extends(HomingMissle, _super);
        function HomingMissle(lazerShooter) {
            _super.call(this, Bosem.ResKeys.homingMissle, lazerShooter, lazerShooter.holder.y + lazerShooter.holder.width / 2);
            this.TURN_RATE = 5;
            if (this.lazerShooter.holder.facingLeft) {
                this.SPEED = -300;
            } else {
                this.SPEED = 300;
            }
        }
        HomingMissle.prototype.update = function () {
            if (this.target) {
                var targetAngle = this.game.physics.arcade.angleBetween(this, this.target);

                // Gradually (this.TURN_RATE) aim the missile towards the target angle
                if (this.rotation !== targetAngle) {
                    // Calculate difference between the current angle and targetAngle
                    var delta = targetAngle - this.rotation;

                    // Keep it in range from -180 to 180 to make the most efficient turns.
                    if (delta > Math.PI)
                        delta -= Math.PI * 2;
                    if (delta < -Math.PI)
                        delta += Math.PI * 2;

                    if (delta > 0) {
                        // Turn clockwise
                        this.angle += this.TURN_RATE;
                    } else {
                        // Turn counter-clockwise
                        this.angle -= this.TURN_RATE;
                    }

                    // Just set angle to target angle if they are close
                    if (Math.abs(delta) < Phaser.Math.degToRad(this.TURN_RATE)) {
                        this.rotation = targetAngle;
                    }
                }

                // Calculate velocity vector based on this.rotation and this.SPEED
                this.spriteBody.velocity.x = Math.cos(this.rotation) * this.SPEED;
                this.spriteBody.velocity.y = Math.sin(this.rotation) * this.SPEED;
            } else {
                this.getTarget();
            }
        };

        HomingMissle.prototype.getTarget = function () {
            var players = Bosem.KillableInGame.getPlayers();
            var player = players[Math.floor(Math.random() * (players.length))];
            if (player.onTeam == this.lazerShooter.holder.onTeam) {
                //It will run aagin
            } else {
                this.target = player;
            }
        };
        HomingMissle.prototype.getDamage = function () {
            this.dmg = 10 * this.lazerShooter.holder.dmg;
            return this.dmg;
        };
        HomingMissle.prototype.hitByBullet = function (bullet) {
            var x = ((this.position.x + bullet.x) / 2);
            var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
            collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
            collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

            setTimeout(function () {
                if (collisionAnimation)
                    collisionAnimation.destroy();
            }, 300);
            this.killBullet = true;
        };

        HomingMissle.prototype.getAttackSpeed = function () {
            return this.lazerShooter.holder.attackSpeed;
        };
        HomingMissle.prototype.getRange = function () {
            return this.lazerShooter.holder.range;
        };
        HomingMissle.prototype.hitSomething = function (something) {
            if (something != this.lazerShooter.holder) {
                try  {
                    this.killBullet = true;
                    var x = ((this.position.x + something.x) / 2);
                    var collisionAnimation = this.game.add.sprite(x, this.y, Bosem.ResKeys.collisionSpriteSheet);
                    collisionAnimation.animations.add(Bosem.ResKeys.collisionSpriteSheet, [1, 2, 3, 4], 10);
                    collisionAnimation.play(Bosem.ResKeys.collisionSpriteSheet);

                    setTimeout(function () {
                        if (collisionAnimation)
                            collisionAnimation.destroy();
                    }, 300);
                } catch (err) {
                }
            }
        };
        return HomingMissle;
    })(Bosem.Ammo);
    Bosem.HomingMissle = HomingMissle;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=HomingMissle.js.map
