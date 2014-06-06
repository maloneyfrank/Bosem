module Bosem {
    export class LazerShooter {
        game: Phaser.Game;

    

        holder: any; // copy of holder 
        bullets = [];
        timer: Phaser.Timer;
        canShoot: boolean;
        ammoType: number;
        onTeam: number;
        attackSpeed: number;
        constructor(game: Phaser.Game, holder: CanShoot, ammoType:number,teamNum:number) {
            this.game = game;
            this.holder = holder;
            this.canShoot = true;
            this.ammoType = ammoType;
            this.onTeam = teamNum;
            this.attackSpeed = this.holder.attackSpeed;
        }

        attack() {

            if (this.canShoot) {
                this.canShoot = false;
                var bullet = Ammo.returnAmmoType(this.ammoType, this)
                this.attackSpeed = bullet.getAttackSpeed();
                this.bullets.push(bullet);
                Collidable.addCollidable(bullet);
                this.timerStuff();
            }

        }
        timerStuff() {
            if (this.attackSpeed > 0) {
                if (this.attackSpeed > 10000) this.holder.attackSpeed = 10000;
                var delay: number = 10000 - this.attackSpeed;
                this.game.time.events.add(delay, this.resetShoot, this);
            }
            
        }
        changeAmmoType(ammoType: number) {
            this.ammoType = ammoType;
        }
      
        update() {

            var collidables: Phaser.Group = Collidable.getCollidables();
            var breakForLoop: boolean = false; //things being removed from arrays, so this is to stop any errors
            for (var i = 0; i < this.bullets.length; i++) {
                var bullet: Ammo = this.bullets[i];
                bullet.updateDistanceMoved();
                if (bullet.getRange() <= bullet.getDistanceMoved() && bullet.getRange() > 0) {
                    this.bullets.splice(i, 1);
                    Collidable.removeCollidable(bullet);
                    breakForLoop = true;
                }
                if (breakForLoop) break;
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
                        Collidable.removeCollidable(bullet);
                        breakForLoop = true;
                    }
                    if (breakForLoop) break;
                }   
            }
           
        }
       
        resetShoot() {
            this.canShoot = true;
        }

    }

} 