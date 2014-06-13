module Bosem {
    export class Player extends Phaser.Sprite implements CanShoot {
        game: Phaser.Game;
        spriteBody: Phaser.Physics.Arcade.Body;
        onTeam: number;
        //keys
        moveRight: Phaser.Key;
        moveLeft: Phaser.Key;
        jump: Phaser.Key;
        duckKey: Phaser.Key;
        attackKey: Phaser.Key;
        useItemKey: Phaser.Key;

        //bools
        livesEditable: boolean;
        canDie: boolean;
        facingLeft: boolean;
        canWallJump: boolean;
        isDucked: boolean;
        canMove: boolean;
        //stats
        moveSpeed: number;
        jumpSpeed: number;
        range: number; //for throwing/shooting
        attackSpeed: number;
        lives: number;
        hp: number;
        dmg: number;
        shields: number;
        static MAX_HP: number = 1000;

        //items
        heldItems: Item[];
        effectItems: Item[]; //if we implement effect items, this will be what the player can cycle through
        useItem: Item;

        ogHeight: number;
        //lazerShooter
        lazerShooter: LazerShooter;
        constructor(game: Phaser.Game, x: number, y: number, playerOptions: number) {
            //initilize...the playeroptions needs to be changed to support more than two if we want too
            if (playerOptions == 0) {
                super(game, x, y, ResKeys.player1Sprite);
                this.game = game;
                this.game.add.existing(this);
            }
            else if (playerOptions == 1) {
                super(game, x, y, ResKeys.player2Sprite);
                this.game = game;
                this.game.add.existing(this);
            }


            this.onTeam = playerOptions;
            this.heldItems = [];
            this.effectItems = [];
            this.useItem = null;
            this.facingLeft = false;
            this.livesEditable = false
            this.canDie = true;
            this.isDucked = false;
            //animations
            this.animations.add(ResKeys.movingRightAttackAnimation, [0, 1, 2, 3], 10);
            this.animations.add(ResKeys.movingLeftAttackAnimation, [4, 5, 6, 7], 10);
            this.animations.add(ResKeys.stillLeftAnimation, [4]);
            this.animations.add(ResKeys.stillRightAnimation, [0]);
            this.animations.add(ResKeys.movingRight, [8, 9, 10, 11], 10);
            this.animations.add(ResKeys.movingLeft, [12, 13, 14, 15], 10);
            this.animations.add(ResKeys.stillAttackRight, [16, 17, 18, 19], 10);
            this.animations.add(ResKeys.stillAttackLeft, [20, 21, 22, 23], 10);
            this.animations.add(ResKeys.jumpRight, [25, 26, 26, 25], 20);
            this.animations.add(ResKeys.jumpLeft, [32, 33, 33, 32], 20);
            this.animations.add(ResKeys.duckRight, [25, 26, 27], 10);
            this.animations.add(ResKeys.duckLeft, [ 30, 31, 32],10);
            this.animations.add(ResKeys.stillDuckLeft, [29]);
            this.animations.add(ResKeys.stillDuckRight,[28]);
            //physics
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 1000; 
            this.canWallJump = true;


            //defaults
            this.moveSpeed = 300;
            this.range = 500;
            this.jumpSpeed = 500;
            this.lives = 5;
            this.hp = Player.MAX_HP;
            this.dmg = 10;
            this.attackSpeed = 9500;
            this.shields = 0;
            this.ogHeight = this.height;
            this.canMove = true;
            //player controls
            if (playerOptions == 0) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
                this.useItemKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
                this.duckKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

            }
            if (playerOptions == 1) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
                this.useItemKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                this.duckKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            }
            this.checkWorldBounds = true;
            this.spriteBody.collideWorldBounds = true;
            this.lazerShooter = new LazerShooter(this.game, this, Ammo.BASIC_AMMO, this.onTeam);
        }

        update() {
            if(this.canMove)
                this.keyControls();
            this.lazerShooter.update();
            for (var i = 0; i < this.effectItems.length; i++) {
                this.effectItems[i].itemUpdate();
            }
        }
        resetErrything() {
            this.game.state.start(ResKeys.battleState, true, false);
        }

        keyControls() {
            this.spriteBody.velocity.x = 0;

            if (this.useItemKey.isDown && this.useItem != null) {
                this.useItem.effect();
            }

            if (this.isDucked) {
                if (this.facingLeft) {
                    this.animations.play(ResKeys.stillDuckLeft);
                } else {
                    this.animations.play(ResKeys.stillDuckRight);
                }
            }
            else if (this.duckKey.isDown) {
                if (this.facingLeft) {
                    this.animations.play(ResKeys.duckLeft);
                } else {
                    this.animations.play(ResKeys.duckRight);
                }
                this.isDucked = true;
                this.duckKey.onUp.add(this.getUp, this);
                this.scale.y = 0.3;
                this.y = this.y + this.ogHeight*2/3;
            }
           else if (this.moveRight.isDown && this.attackKey.isDown) {
                if (this.x + this.width < this.game.camera.x + this.game.camera.width)
                    this.spriteBody.velocity.x = this.moveSpeed;
                this.facingLeft = false;
                this.animations.play(ResKeys.movingRightAttackAnimation);
                this.lazerShooter.attack();
            }
            else if (this.moveRight.isDown) {
                if (this.x + this.width < this.game.camera.x + this.game.camera.width)
                    this.spriteBody.velocity.x = this.moveSpeed;
                this.facingLeft = false;
                this.animations.play(ResKeys.movingRight);
            }
            else if (this.moveLeft.isDown && this.attackKey.isDown) {
                if (this.x > this.game.camera.x)
                    this.spriteBody.velocity.x = -this.moveSpeed;
                this.facingLeft = true;
                this.animations.play(ResKeys.movingLeftAttackAnimation);
                this.lazerShooter.attack();
            }
            else if (this.moveLeft.isDown) {
                if (this.x > this.game.camera.x)
                    this.spriteBody.velocity.x = -this.moveSpeed;
                this.facingLeft = true;
                this.animations.play(ResKeys.movingLeft);
            }
            else if (this.attackKey.isDown && this.facingLeft == false) {
                this.animations.play(ResKeys.stillAttackRight);
                this.lazerShooter.attack();
            }
            else if (this.attackKey.isDown && this.facingLeft) {
                this.lazerShooter.attack();
                this.animations.play(ResKeys.stillAttackLeft);
            }
            else {
                if (this.facingLeft) {
                    this.animations.play(ResKeys.stillLeftAnimation);
                } else {
                    this.animations.play(ResKeys.stillRightAnimation);

                }

            }
            if(!this.isDucked)
            if (this.jump.isDown && (this.spriteBody.onFloor() || this.spriteBody.onWall())) {
                this.spriteBody.velocity.y = -this.jumpSpeed;
            }



        }

        getUp() {
            this.scale.y = 1;
            this.isDucked = false;
            this.y = this.y - this.ogHeight * 2 / 3;
        }

        respawn() {
            this.lives--;
        }
        recieveDamage(damage: number) {
            if (this.shields <= 0) {
                this.hp -= damage;
            } else
                this.shields--;
        }

        hitByBullet(bullet: Ammo) {
            if (this.onTeam != bullet.onTeam)
                this.recieveDamage(bullet.getDamage());
        }

        incrementMoveSpeed(increment: number) {
            this.moveSpeed += increment;
            if (this.moveSpeed < 10) this.moveSpeed = 10;
            if (this.moveSpeed > 2000) this.moveSpeed = 2000;
        }
        incrementRange(increment: number) {
            this.range += increment;
            if (this.range < 10) this.range = 10;
            if (this.range > 1500) this.range = 1500;
        }
        incrementJumpSpeed(increment: number) {
            this.jumpSpeed += increment;
            if (this.jumpSpeed < 10) this.jumpSpeed = 10;
            if (this.jumpSpeed > 2000) this.jumpSpeed = 2000;
        }
        incrementLives(increment: number) {
            this.lives += increment;
            if (this.lives > 8) {
                this.lives = 8;
                this.hp = Player.MAX_HP;
            }
        }
        incrementDamage(increment: number) {
            this.dmg += increment;
        }
        incrementAttackSpeed(increment: number) {
            this.attackSpeed += increment;
            if (this.attackSpeed > 10000) this.attackSpeed = 10000;
            if (this.attackSpeed < 1) this.attackSpeed = 1;
        }
        incrementGravity(increment: number) {
            this.spriteBody.gravity.y += increment;
        }
    }
}