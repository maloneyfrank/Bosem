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
            } else if (playerOptions == 3) {
                _super.call(this, game, x, y, Bosem.ResKeys.player2Sprite);
            }
            this.onTeam = playerOptions;
            this.heldItems = [];
            this.effectItems = [];
            this.facingLeft = false;
            this.livesEditable = false;
            this.canDie = true;

            //animations
            this.animations.add(Bosem.ResKeys.movingRightAttackAnimation, [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], 20);
            this.animations.add(Bosem.ResKeys.movingLeftAttackAnimation, [8, 9, 10, 11, 12, 13, 14, 13, 12, 11, 10, 9], 20);
            this.animations.add(Bosem.ResKeys.stillLeftAnimation, [8]);
            this.animations.add(Bosem.ResKeys.stillRightAnimation, [0]);
            this.animations.add(Bosem.ResKeys.movingRight, [16, 17, 18, 19, 20, 21, 22, 23, 22, 21, 20, 19, 18, 17], 20);
            this.animations.add(Bosem.ResKeys.movingLeft, [27, 26, 27, 28, 29, 30, 29, 28, 27, 26], 20);
            this.animations.add(Bosem.ResKeys.stillAttackRight, [32, 33, 34, 35, 36, 37, 38, 37, 36, 35, 34, 33, 32], 20);
            this.animations.add(Bosem.ResKeys.stillAttackLeft, [39, 40, 41, 42, 43, 44, 45, 44, 43, 42, 41, 40, 39], 20);
            this.animations.add(Bosem.ResKeys.jumpRight, [46, 47, 48, 49, 50, 49, 48, 47, 46], 20);
            this.animations.add(Bosem.ResKeys.jumpLeft, [51, 52, 53, 54, 55, 56, 55, 54, 53, 52, 51], 20);

            //physics
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 1000;

            this.lazerShooter = new Bosem.LazerShooter(this.game, this, Bosem.Ammo.BASIC_AMMO, this.onTeam);

            //defaults
            this.moveSpeed = 300;
            this.jumpSpeed = 500;
            this.lives = 5;
            this.hp = 1000;
            this.dmg = 10;
            this.attackSpeed = 3500;
            this.shields = 0;

            //player controls
            if (playerOptions == 0) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.CAPS_LOCK);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
            }
            if (playerOptions == 1) {
                this.moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
            }
            this.checkWorldBounds = true;
            this.spriteBody.collideWorldBounds = true;
        }
        Player.prototype.update = function () {
            this.keyControls();
            this.lazerShooter.update();
            for (var i = 0; i < this.effectItems.length; i++) {
                this.effectItems[i].itemUpdate();
            }

            if (!this.inWorld) {
                this.hp = 0;
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

            if (this.moveRight.isDown && this.attackKey.isDown) {
                this.facingLeft = false;
                this.spriteBody.velocity.x = this.moveSpeed;
                this.animations.play(Bosem.ResKeys.movingRightAttackAnimation);
                this.lazerShooter.attack();
            } else if (this.moveRight.isDown) {
                this.facingLeft = false;
                this.spriteBody.velocity.x = this.moveSpeed;
                this.animations.play(Bosem.ResKeys.movingRight);
            } else if (this.moveLeft.isDown && this.attackKey.isDown) {
                this.facingLeft = true;
                this.animations.play(Bosem.ResKeys.movingLeftAttackAnimation);
                this.spriteBody.velocity.x = -this.moveSpeed;
                this.lazerShooter.attack();
            } else if (this.moveLeft.isDown) {
                this.facingLeft = true;
                this.animations.play(Bosem.ResKeys.movingLeft);
                this.spriteBody.velocity.x = -this.moveSpeed;
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
        Player.prototype.setEnemy = function (enemy) {
            this.enemy = enemy;
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
            this.recieveDamage(bullet.getDamage());
        };
        return Player;
    })(Phaser.Sprite);
    Bosem.Player = Player;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Player.js.map
