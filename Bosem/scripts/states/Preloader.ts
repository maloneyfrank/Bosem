﻿module Bosem {
    export class Preloader extends Phaser.State{
        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.world.centerX - 200, this.world.centerY - 20, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.spritesheet(ResKeys.player1Sprite, 'assets/player1.png', 50, 65);
            this.load.spritesheet(ResKeys.player2Sprite, 'assets/player2.png', 50, 65);
            this.load.image(ResKeys.startButtonSprite, 'assets/startButton.png');
            this.game.load.tilemap(ResKeys.map1, 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(ResKeys.bricks, 'assets/tiles1.png');
            this.game.load.image(ResKeys.lazerAmmo, 'assets/lazerAmmo.png');
            this.game.load.image(ResKeys.cofee, 'assets/coffee.png');
            this.game.load.spritesheet(ResKeys.collisionSpriteSheet, 'assets/collisionspritesheet.png', 42.3, 37.8);
            this.game.load.image(ResKeys.shield, 'assets/shield.jpg');
            this.game.load.spritesheet(ResKeys.fishSprite, 'assets/fishsprite.png', 113, 60);
            this.game.load.spritesheet(ResKeys.flameAmmo, 'assets/flame.png', 252, 60);
            this.game.load.image(ResKeys.player1Health, 'assets/redHealth.png');
            this.game.load.image(ResKeys.player2Health, 'assets/blueHealth.png');
            this.game.load.image(Bosem.ResKeys.kamikaze, 'assets/kamikaze.png');
            this.game.load.image(Bosem.ResKeys.tabasco, 'assets/tabasco.png');
            this.game.load.image(ResKeys.lazerGun, 'assets/lasergun.png');
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {
            this.game.state.start(ResKeys.menuState, true, false);
        }
    }
} 