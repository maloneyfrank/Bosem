var Bosem;
(function (Bosem) {
    var LazerShooter = (function () {
        function LazerShooter(game, holder, ammoType, teamNum) {
            this.bullets = [];
            this.game = game;
            this.holder = holder;
            this.canShoot = true;
            this.ammoType = ammoType;
            this.onTeam = teamNum;
            this.attackSpeed = this.holder.attackSpeed;
        }
        LazerShooter.prototype.attack = function () {
            if (this.canShoot) {
                var bullet = Bosem.Ammo.returnAmmoType(this.ammoType, this);
                this.attackSpeed = bullet.getAttackSpeed();
                this.bullets.push(bullet);
                Bosem.Collidable.addCollidable(bullet);
                this.bullets[this.bullets.length - 1].checkWorldBounds = true;
                this.bullets[this.bullets.length - 1].outOfBoundsKill = true;
                this.canShoot = false;
                this.timerStuff();
            }
        };
        LazerShooter.prototype.timerStuff = function () {
            if (this.attackSpeed > 5000)
                this.holder.attackSpeed = 5000;
            var delay = 5000 - this.attackSpeed;
            this.game.time.events.add(delay, this.resetShoot, this);
        };
        LazerShooter.prototype.changeAmmoType = function (ammoType) {
            this.ammoType = ammoType;
        };

        LazerShooter.prototype.update = function () {
            var collidables = Bosem.Collidable.getCollidables();
            var breakForLoop = false;
            for (var i = 0; i < this.bullets.length; i++) {
                var bullet = this.bullets[i];
                bullet.updateDistanceMoved();
                if (bullet.getRange() <= bullet.getDistanceMoved()) {
                    this.bullets.splice(i, 1);
                    Bosem.Collidable.removeCollidable(bullet);
                    breakForLoop = true;
                }
                if (breakForLoop)
                    break;
                for (var j = 0; j < collidables.length; j++) {
                    if (this.game.physics.arcade.collide(collidables.getAt(j), bullet)) {
                        var collidedWith = collidables.getAt(j);
                        try  {
                            collidedWith.hitByBullet(bullet);
                        } catch (err) {
                        }
                        this.bullets.splice(i, 1);
                        Bosem.Collidable.removeCollidable(bullet);
                        breakForLoop = true;
                    }
                    if (breakForLoop)
                        break;
                }
            }
        };

        LazerShooter.prototype.resetShoot = function () {
            this.canShoot = true;
        };
        return LazerShooter;
    })();
    Bosem.LazerShooter = LazerShooter;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=LazerShooter.js.map
