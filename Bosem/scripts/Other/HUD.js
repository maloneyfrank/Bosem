var Bosem;
(function (Bosem) {
    var HUD = (function () {
        function HUD() {
        }
        HUD.init = function (game) {
            this.game = game;

            this.itemHolderRects = [];
            this.itemsInHolders = [];
            this.healthHearts = [];
            this.heartFills = [];
            this.cropRects = [];

            for (var i = 0; i < Bosem.KillableInGame.players.length; i++) {
                this.healthHearts.push(new Array());
                this.heartFills.push(new Array());
                this.cropRects.push(new Phaser.Rectangle(0, 0, 0, 0));
                this.addHearts(i);
                this.addItemFrames(i);
            }
        };
        HUD.addHearts = function (i) {
            for (var j = 0; j < Bosem.KillableInGame.players[i].lives; j++) {
                if (j == Bosem.KillableInGame.players[i].lives - 1) {
                    //loads the different heart image that can be cropped for the last one
                    if (i == 0) {
                        this.heartFills[i].push(new Phaser.Image(this.game, j * 60, 0, 'heartFill' + i, 0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, j * 60, 0, Bosem.ResKeys.heartPic, 0));
                    }
                    if (i == 1) {
                        this.heartFills[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, 'heartFill' + i, 0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, Bosem.ResKeys.heartPic, 0));
                    }
                } else {
                    //loads uncroppable image
                    if (i == 0) {
                        this.heartFills[i].push(new Phaser.Image(this.game, j * 60, 0, Bosem.ResKeys.heartFill, 0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, j * 60, 0, Bosem.ResKeys.heartPic, 0));
                    }
                    if (i == 1) {
                        this.heartFills[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, Bosem.ResKeys.heartFill, 0));
                        this.healthHearts[i].push(new Phaser.Image(this.game, this.game.width - ((j + 1) * 60), 0, Bosem.ResKeys.heartPic, 0));
                    }
                }
                this.healthHearts[i][j].fixedToCamera = true;
                this.heartFills[i][j].fixedToCamera = true;
                this.game.add.existing(this.healthHearts[i][j]);
                this.game.add.existing(this.heartFills[i][j]);
            }
        };
        HUD.addItemFrames = function (i) {
            //add it under the first heart
            this.itemHolderRects.push(new Phaser.Image(this.game, this.healthHearts[i][0].x, this.healthHearts[i][0].y + this.healthHearts[i][0].height + 1, Bosem.ResKeys.itemAreaPic, 0));
            this.itemsInHolders.push(null);
            this.itemHolderRects[i].fixedToCamera = true;
            this.itemHolderRects[i].cameraOffset.set(this.itemHolderRects[i].x, this.itemHolderRects[i].y);
            this.game.add.existing(this.itemHolderRects[i]);
        };
        HUD.displayHud = function () {
            for (var i = 0; i < Bosem.KillableInGame.players.length; i++) {
                this.dispayHealth(i);
                this.displayUseItem(i);
            }
        };
        HUD.dispayHealth = function (i) {
            //checks to see if there are enough hearts for the player on the screen
            if (this.healthHearts[i].length < Bosem.KillableInGame.players[i].lives) {
                //if not it adds a heart
                var heartFill = new Phaser.Image(this.game, 10, 0, Bosem.ResKeys.heartFill, 0);
                var healthHeart = new Phaser.Image(this.game, 0, 0, Bosem.ResKeys.heartPic, 0);
                heartFill.fixedToCamera = true;
                healthHeart.fixedToCamera = true;

                //sets their position to the last hearts
                heartFill.cameraOffset.x = this.heartFills[i][this.healthHearts[i].length - 1].cameraOffset.x;
                healthHeart.cameraOffset.x = this.healthHearts[i][this.healthHearts[i].length - 1].cameraOffset.x;
                heartFill.bringToTop();
                this.healthHearts[i].splice(this.healthHearts[i].length - 1, 0, healthHeart);
                this.heartFills[i].splice(this.heartFills[i].length - 1, 0, heartFill);
                this.game.add.existing(heartFill);
                this.game.add.existing(healthHeart);

                //moves the last hearts (this is croppable, moving is easier than changing pictures)
                if (this.healthHearts[i][this.healthHearts[i].length - 3].x < this.healthHearts[i][this.healthHearts[i].length - 1].x) {
                    this.healthHearts[i][this.healthHearts[i].length - 1].cameraOffset.x += 60;
                    this.heartFills[i][this.healthHearts[i].length - 1].cameraOffset.x += 60;
                } else {
                    this.healthHearts[i][this.healthHearts[i].length - 1].cameraOffset.x -= 60;
                    this.heartFills[i][this.healthHearts[i].length - 1].cameraOffset.x -= 60;
                }
            }

            //checks to see if there are too many hearts, removes if there are
            if (this.healthHearts[i].length > Bosem.KillableInGame.players[i].lives) {
                this.healthHearts[i][this.healthHearts[i].length - 1].destroy();
                this.heartFills[i][this.heartFills[i].length - 1].destroy();

                this.healthHearts[i].pop();
                this.heartFills[i].pop();
                this.heartFills[i][this.heartFills[i].length - 1].destroy();
                this.heartFills[i][this.heartFills[i].length - 1] = this.game.add.image(10, 10, 'heartFill' + i);
                this.heartFills[i][this.heartFills[i].length - 1].crop(null);
                this.heartFills[i][this.heartFills[i].length - 1].fixedToCamera = true;
                this.heartFills[i][this.heartFills[i].length - 1].cameraOffset.x = this.healthHearts[i][this.healthHearts[i].length - 1].cameraOffset.x;
                this.heartFills[i][this.heartFills[i].length - 1].cameraOffset.y = this.healthHearts[i][this.healthHearts[i].length - 1].cameraOffset.y;
                this.heartFills[i][this.heartFills[i].length - 1].bringToTop();
            }
            var currentHeart = this.heartFills[i][this.heartFills[i].length - 1];
            var height = 55 * Bosem.KillableInGame.players[i].hp / Bosem.Player.MAX_HP;

            //56 is height of picture
            this.cropRects[i] = new Phaser.Rectangle(0, 0, currentHeart.width, height);
            currentHeart.crop(null);
            currentHeart.crop(this.cropRects[i]);
        };
        HUD.displayUseItem = function (i) {
            if (Bosem.KillableInGame.players[i].useItem != null) {
                if (this.itemsInHolders[i] == null) {
                    var x = this.itemHolderRects[i].cameraOffset.x + this.ITEM_IN_HOLDER_DISPLACEMENT;
                    var y = this.itemHolderRects[i].cameraOffset.y + this.ITEM_IN_HOLDER_DISPLACEMENT;
                    this.itemsInHolders[i] = this.game.add.image(0, 0, Bosem.KillableInGame.players[i].useItem.key);
                    this.itemsInHolders[i].fixedToCamera = true;
                    this.itemsInHolders[i].cameraOffset.setTo(x, y);
                    this.itemsInHolders[i].height = this.ITEM_IN_HOLDER_SIDE;
                    this.itemsInHolders[i].width = this.ITEM_IN_HOLDER_SIDE;
                }
            } else if (this.itemsInHolders[i] != null) {
                this.itemsInHolders[i].texture = null;
                this.itemsInHolders[i].destroy();
                this.itemsInHolders[i] = null;
            }
        };
        HUD.ITEM_IN_HOLDER_SIDE = 52;
        HUD.ITEM_IN_HOLDER_DISPLACEMENT = 4;
        return HUD;
    })();
    Bosem.HUD = HUD;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=HUD.js.map
