var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.centerX - 200, this.world.centerY - 20, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.spritesheet(Bosem.ResKeys.player1Sprite, 'assets/player1.png', 50, 65);
            this.load.spritesheet(Bosem.ResKeys.player2Sprite, 'assets/player2.png', 50, 65);
            this.load.image(Bosem.ResKeys.startButtonSprite, 'assets/startButton.png');
            this.game.load.tilemap(Bosem.ResKeys.map1, 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(Bosem.ResKeys.bricks, 'assets/tiles1.png');
            this.game.load.image(Bosem.ResKeys.lazerAmmo, 'assets/lazerAmmo.png');
            this.game.load.image(Bosem.ResKeys.cofee, 'assets/coffee.png');
            this.game.load.spritesheet(Bosem.ResKeys.collisionSpriteSheet, 'assets/collisionspritesheet.png', 42.3, 37.8);
            this.game.load.image(Bosem.ResKeys.shield, 'assets/shield.jpg');
            this.game.load.spritesheet(Bosem.ResKeys.fishSprite, 'assets/fishsprite.png', 113, 60);
            this.game.load.image(Bosem.ResKeys.player1Health, 'assets/redHealth.png');
            this.game.load.image(Bosem.ResKeys.player2Health, 'assets/blueHealth.png');
            this.game.load.image(Bosem.ResKeys.kamikaze, 'assets/kamikaze.png');
            this.game.load.image(Bosem.ResKeys.tabasco, 'assets/tabasco.png');
            this.game.load.image(Bosem.ResKeys.lazerGun, 'assets/lasergun.png');
            this.game.load.image(Bosem.ResKeys.sniperGun, 'assets/sniperGun.jpg');
            this.game.load.image(Bosem.ResKeys.sniperAmmo, 'assets/sniperAmmo.png');
            this.game.load.image(Bosem.ResKeys.menuImage1, 'assets/menuImage1.png');
            this.game.load.image(Bosem.ResKeys.menuImage2, 'assets/menuImage2.png');
            this.game.load.image(Bosem.ResKeys.heartPic, 'assets/heart.png');
            this.game.load.image(Bosem.ResKeys.heartFill, 'assets/heartfill.png');
            this.game.load.image(Bosem.ResKeys.homingMissle, 'assets/missle.png');
            this.game.load.image(Bosem.ResKeys.radar, 'assets/radar.png');
            this.game.load.image(Bosem.ResKeys.chargedLazer, 'assets/ChargedShot.png');
            this.game.load.image(Bosem.ResKeys.chargingBall, 'assets/ChargingShot.png');
            this.game.load.image(Bosem.ResKeys.chargingLazerGun, 'assets/charginglazergun.png');
            this.game.load.image(Bosem.ResKeys.boomerangGun, 'assets/boomerangGun.jpg');
            this.game.load.image(Bosem.ResKeys.itemAreaPic, 'assets/ItemArea.png');
            this.game.load.image(Bosem.ResKeys.blink, 'assets/blink.jpg');
            this.game.load.image(Bosem.ResKeys.jetpack, 'assets/jetpack.png');
            this.game.load.image(Bosem.ResKeys.controlsPic, 'assets/Controls.png');

            //croppable hearts for players (add more for more players) - heartFill + i
            this.game.load.image('heartFill0', 'assets/heartfill.png');
            this.game.load.image('heartFill1', 'assets/heartfill.png');
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start(Bosem.ResKeys.menuState, true, false);
        };
        return Preloader;
    })(Phaser.State);
    Bosem.Preloader = Preloader;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Preloader.js.map
