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
        constructor(game: Phaser.Game, holder: CanShoot, ammoType:number,teamNum:number) {
            this.game = game;
            this.holder = holder;
            this.canShoot = true;
            this.ammoType = ammoType;
            this.onTeam = teamNum;
        }

        attack() {

            if (this.canShoot) {
                var bullet = Ammo.returnAmmoType(this.ammoType, this)
                this.bullets.push(bullet);
                Collidable.addCollidable(bullet);
               this.bullets[this.bullets.length - 1].checkWorldBounds = true
                this.bullets[this.bullets.length - 1].outOfBoundsKill = true
                this.canShoot = false;
                this.timerStuff();
            }
        }
        timerStuff() {
            if (this.holder.attackSpeed > 5000) this.holder.attackSpeed = 5000;
            var delay:number = 5000 - this.holder.attackSpeed;
            this.game.time.events.add(delay, this.resetShoot,this);
            
        }
        changeAmmoType(ammoType: number) {
            this.ammoType = ammoType;
        }
      
        update() {

            var collidables: Phaser.Group = Collidable.getCollidables();
            var breakForLoop: boolean = false; //things being removed from arrays, so this is to stop any errors
            for (var i = 0; i < this.bullets.length; i++) {
                for (var j = 0; j < collidables.length; j++) {
                    if (this.game.physics.arcade.collide(collidables.getAt(j), this.bullets[i])) {
                        var collidedWith = collidables.getAt(j);
                        var bullet = this.bullets[i];
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