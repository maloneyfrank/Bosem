module Bosem {
    export class FlamethrowingFish extends Item {
        lazerShooter: LazerShooter;
        pseudoPlayer: Player;
        toX: number;
        toY: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, ResKeys.fishSprite);
            this.animations.add(ResKeys.fishRight, [0, 1, 2, 3, 4, 5, 6, 7,6,5,4,3,2,1], 20, true);
            this.animations.add(ResKeys.fishLeft, [8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9], 20, true);

        }
        init(holder: Player) {
            super.init(holder);
            holder.heldItems.push(this);
            holder.effectItems.push(this);
            this.pseudoPlayer = new Player(this.game, this.x, this.y, 3);
            this.pseudoPlayer.setEnemy(this.holder.enemy);
            this.pseudoPlayer.ammoType = Ammo.BASIC_AMMO;
            this.game.add.existing(this);
            this.pseudoPlayer.dmg = 8;
            this.spriteBody.acceleration.y = 0;
            this.pseudoPlayer.scale.y = 0.92;
            this.setMovement();
            var timer = this.game.time.create(false);
            timer.loop(2000, this.setMovement, this);
            timer.start();

        }
        itemUpdate() {
            this.pseudoPlayer.position.x = this.position.x;
            this.pseudoPlayer.position.y = this.position.y;
            
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
                this.pseudoPlayer.facingLeft = false;
            }
            else {
                this.animations.play(ResKeys.fishLeft);
                this.pseudoPlayer.facingLeft = true;

            }
        }
        
        checkAttack() {
            var attack = Math.floor(Math.random() * 10);
            if (attack == 1)
                this.attack();
        }
        attack() {

              this.pseudoPlayer.lazerShooter.attack(Ammo.FLAME_AMMO);
        }
    }
} 