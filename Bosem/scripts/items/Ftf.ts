module Bosem {
    export class FlamethrowingFish extends Item implements CanShoot{
        lazerShooter: LazerShooter;
        toX: number;
        toY: number;
        facingLeft: boolean;
        dmg: number;
        hp: number;
        range: number;
        attackSpeed: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.fishSprite);
            this.dmg = 5;
            this.range = 1;
            this.attackSpeed = 3500;
            this.animations.add(ResKeys.fishRight, [0, 1, 2, 3, 4, 5, 6, 7,6,5,4,3,2,1], 20, true);
            this.animations.add(ResKeys.fishLeft, [8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9], 20, true);

        }
        init(holder: Player) {
            super.init(holder);
            holder.heldItems.push(this);
            holder.effectItems.push(this);
            this.hp = 500;
            this.game.add.existing(this);
            this.spriteBody.acceleration.y = 0;

            this.setMovement();
            var fishTimer = this.game.time.create(false);
            fishTimer.loop(2000, this.setMovement, this);
            fishTimer.start();

            //this.lazerShooter = new LazerShooter(this.game, this, Ammo.FLAME_AMMO,this.onTeam);
         

        }
        itemUpdate() {            
            this.checkAttack();
        }
        setMovement() {
            this.spriteBody.acceleration.setTo(0, 0);
            this.spriteBody.velocity.setTo(0, 0);
            this.toX = Math.floor(Math.random() * 5) + this.holder.x;
            this.toY = Math.floor(Math.random() * this.holder.height) + this.holder.y;
            this.game.physics.arcade.accelerateToXY(this, this.toX, this.toY);
            if (this.toX > this.x) {
                this.animations.play(ResKeys.fishRight);
                this.facingLeft = false;
            }
            else {
                this.animations.play(ResKeys.fishLeft);
                this.facingLeft = true;

            }
        }
        
        checkAttack() {
            var attack = Math.floor(Math.random() * 10);
            if (attack == 1)
                this.attack();
            
        }
        attack() {

              this.lazerShooter.attack();
        }
    }
} 