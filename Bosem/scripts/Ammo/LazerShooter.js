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
            if (this.onTeam == 0) {
                this.reloadBar = this.game.add.image(120, 60, Bosem.ResKeys.reloadBar);
                this.reloadBar.cameraOffset.setTo(120, 60);
                this.reloadBar.fixedToCamera = true;
            } else {
                this.reloadBar = this.game.add.image(904, 60, Bosem.ResKeys.reloadBar);
                this.reloadBar.cameraOffset.setTo(904, 60);
                this.reloadBar.fixedToCamera = true;
            }
        }
        LazerShooter.prototype.attack = function () {
            if (this.canShoot) {
                this.canShoot = false;
                var bullet = Bosem.Ammo.returnAmmoType(this.ammoType, this);
                this.attackSpeed = bullet.getAttackSpeed();
                this.bullets.push(bullet);
                Bosem.Collidable.addCollidable(bullet);
                this.timerStuff();
            }
        };
        LazerShooter.prototype.timerStuff = function () {
            if (this.attackSpeed > 0) {
                if (this.attackSpeed > 10000)
                    this.holder.attackSpeed = 10000;
                var delay = 10000 - this.attackSpeed;
                this.game.time.events.add(delay, this.resetShoot, this);
                this.game.add.tween(this.reloadBar).from({ height: 1 }, delay, Phaser.Easing.Linear.None, true);
            }
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
                if (bullet.getRange() <= bullet.getDistanceMoved() && bullet.getRange() > 0) {
                    this.bullets.splice(i, 1);
                    Bosem.Collidable.removeCollidable(bullet);
                    breakForLoop = true;
                }
                if (breakForLoop)
                    break;
                for (var j = 0; j < collidables.length; j++) {
                    if (this.game.physics.arcade.intersects(collidables.getAt(j).body, bullet.body)) {
                        var collidedWith = collidables.getAt(j);
                        if (collidedWith != bullet) {
                            collidedWith.hitByBullet(bullet);
                            bullet.hitSomething(collidedWith);
                        }
                    }
                    if (bullet.killBullet) {
                        bullet.destroy();
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
