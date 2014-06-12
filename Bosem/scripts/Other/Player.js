var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, playerOptions) {
            //initilize...the playeroptions needs to be changed to support more than two if we want too
            if (playerOptions == 0) {
                _super.call(this, game, x, y, Bosem.ResKeys.player1Sprite);
                this.game = game;
                this.game.add.existing(this);
            } else if (playerOptions == 1) {
                _super.call(this, game, x, y, Bosem.ResKeys.player2Sprite);
                this.game = game;
                this.game.add.existing(this);
            }

            this.onTeam = playerOptions;
            this.heldItems = [];
            this.effectItems = [];
            this.useItem = null;
            this.facingLeft = false;
            this.livesEditable = false;
            this.canDie = true;

            //animations
            this.animations.add(Bosem.ResKeys.movingRightAttackAnimation, [0, 1, 2, 3], 10);
            this.animations.add(Bosem.ResKeys.movingLeftAttackAnimation, [4, 5, 6, 7], 10);
            this.animations.add(Bosem.ResKeys.stillLeftAnimation, [4]);
            this.animations.add(Bosem.ResKeys.stillRightAnimation, [0]);
            this.animations.add(Bosem.ResKeys.movingRight, [8, 9, 10, 11], 10);
            this.animations.add(Bosem.ResKeys.movingLeft, [12, 13, 14, 15], 10);
            this.animations.add(Bosem.ResKeys.stillAttackRight, [16, 17, 18, 19], 10);
            this.animations.add(Bosem.ResKeys.stillAttackLeft, [20, 21, 22, 23], 10);
            this.animations.add(Bosem.ResKeys.jumpRight, [25, 26, 26, 25], 20);
            this.animations.add(Bosem.ResKeys.jumpLeft, [32, 33, 33, 32], 20);

            //physics
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 1000;
            this.spriteBody.bounce.y = 0.2;
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

            //player controls
            if (playerOptions == 0) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
                this.useItemKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
            }
            if (playerOptions == 1) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
                this.useItemKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            }
            this.checkWorldBounds = true;
            this.spriteBody.collideWorldBounds = true;
            this.lazerShooter = new Bosem.LazerShooter(this.game, this, Bosem.Ammo.BASIC_AMMO, this.onTeam);
        }
        Player.prototype.update = function () {
            this.keyControls();
            this.lazerShooter.update();
            for (var i = 0; i < this.effectItems.length; i++) {
                this.effectItems[i].itemUpdate();
            }

            if (this.lives == 0) {
                var style = { font: '100px Impact', fill: 'Pink' };
                this.game.add.text(300, 300, "PLAYER " + this.onTeam + " LOSES!", style);
                var timer = this.game.time.create(true);
                timer.loop(5000, this.resetErrything, this);
                timer.start();
            }
        };
        Player.prototype.resetErrything = function () {
            this.game.state.start(Bosem.ResKeys.battleState, true, false);
        };

        Player.prototype.keyControls = function () {
            this.spriteBody.velocity.x = 0;
            if (this.useItemKey.isDown && this.useItem != null) {
                this.useItem.effect();
            }

            if (this.moveRight.isDown && this.attackKey.isDown) {
                if (this.x + this.width < this.game.camera.x + this.game.camera.width)
                    this.spriteBody.velocity.x = this.moveSpeed;
                this.facingLeft = false;
                this.animations.play(Bosem.ResKeys.movingRightAttackAnimation);
                this.lazerShooter.attack();
            } else if (this.moveRight.isDown) {
                if (this.x + this.width < this.game.camera.x + this.game.camera.width)
                    this.spriteBody.velocity.x = this.moveSpeed;
                this.facingLeft = false;
                this.animations.play(Bosem.ResKeys.movingRight);
            } else if (this.moveLeft.isDown && this.attackKey.isDown) {
                if (this.x > this.game.camera.x)
                    this.spriteBody.velocity.x = -this.moveSpeed;
                this.facingLeft = true;
                this.animations.play(Bosem.ResKeys.movingLeftAttackAnimation);
                this.lazerShooter.attack();
            } else if (this.moveLeft.isDown) {
                if (this.x > this.game.camera.x)
                    this.spriteBody.velocity.x = -this.moveSpeed;
                this.facingLeft = true;
                this.animations.play(Bosem.ResKeys.movingLeft);
            } else if (this.attackKey.isDown && this.facingLeft == false) {
                this.animations.play(Bosem.ResKeys.stillAttackRight);
                this.lazerShooter.attack();
            } else if (this.attackKey.isDown && this.facingLeft) {
                this.lazerShooter.attack();
                this.animations.play(Bosem.ResKeys.stillAttackLeft);
            } else {
                if (this.facingLeft) {
                    this.animations.play(Bosem.ResKeys.stillLeftAnimation);
                } else {
                    this.animations.play(Bosem.ResKeys.stillRightAnimation);
                }
            }

            if (this.jump.isDown && (this.spriteBody.onFloor() || this.spriteBody.onWall())) {
                this.spriteBody.velocity.y = -this.jumpSpeed;
            }
        };

        Player.prototype.respawn = function () {
            this.lives--;
        };
        Player.prototype.recieveDamage = function (damage) {
            if (this.shields <= 0) {
                this.hp -= damage;
            } else
                this.shields--;
        };

        Player.prototype.hitByBullet = function (bullet) {
            if (this.onTeam != bullet.onTeam)
                this.recieveDamage(bullet.getDamage());
        };

        Player.prototype.incrementMoveSpeed = function (increment) {
            this.moveSpeed += increment;
            if (this.moveSpeed < 10)
                this.moveSpeed = 10;
            if (this.moveSpeed > 2000)
                this.moveSpeed = 2000;
        };
        Player.prototype.incrementRange = function (increment) {
            this.range += increment;
            if (this.range < 10)
                this.range = 10;
            if (this.range > 1500)
                this.range = 1500;
        };
        Player.prototype.incrementJumpSpeed = function (increment) {
            this.jumpSpeed += increment;
            if (this.jumpSpeed < 10)
                this.jumpSpeed = 10;
            if (this.jumpSpeed > 2000)
                this.jumpSpeed = 2000;
        };
        Player.prototype.incrementLives = function (increment) {
            this.lives += increment;
            if (this.lives > 8) {
                this.lives = 8;
                this.hp = Player.MAX_HP;
            }
        };
        Player.prototype.incrementDamage = function (increment) {
            this.dmg += increment;
        };
        Player.prototype.incrementAttackSpeed = function (increment) {
            this.attackSpeed += increment;
            if (this.attackSpeed > 10000)
                this.attackSpeed = 10000;
            if (this.attackSpeed < 1)
                this.attackSpeed = 1;
        };
        Player.prototype.incrementGravity = function (increment) {
            this.spriteBody.gravity.y += increment;
        };
        Player.MAX_HP = 1000;
        return Player;
    })(Phaser.Sprite);
    Bosem.Player = Player;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Player.js.map
