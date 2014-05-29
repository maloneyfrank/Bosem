module Bosem {
    export class LazerShooter {
        game: Phaser.Game;

        /*
        Properties holder needs to have:
            facingLeft: boolean - whether the holder is facing left 
            needs to extend sprite
            dmg:number - amount of damage
        
        */


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
                var bullet = Ammo.returnAmmoType(this.ammoType, this)
                this.attackSpeed = bullet.getAttackSpeed();
                this.bullets.push(bullet);
                Collidable.addCollidable(bullet);
                bullet.deltaX = 0;
                this.canShoot = false;
                this.timerStuff();
            }

        }
        timerStuff() {
            if (this.attackSpeed > 5000) this.holder.attackSpeed = 5000;
            var delay:number = 5000 - this.attackSpeed;
            this.game.time.events.add(delay, this.resetShoot,this);
            
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
                if (bullet.getRange() <= bullet.getDistanceMoved()) {
                    this.bullets.splice(i, 1);
                    Collidable.removeCollidable(bullet);
                    breakForLoop = true;
                }
                if (breakForLoop) break;
                for (var j = 0; j < collidables.length; j++) {
                    if (this.game.physics.arcade.collide(collidables.getAt(j), bullet)) {
                        var collidedWith = collidables.getAt(j);
                        try {
                            collidedWith.hitByBullet(bullet);
                        } catch (err) { }
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