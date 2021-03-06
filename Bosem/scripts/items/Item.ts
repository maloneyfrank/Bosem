﻿module Bosem {
    export class Item extends Phaser.Sprite {
        game: Phaser.Game;
        holder: Player; //copy of player that is holding this item
        spriteBody: Phaser.Physics.Arcade.Body;
        onTeam: number;
        static allItems: any[] = [];
        static maxDropped = 10;
        static timesDropped = 0;

        static dropRate: number = 50;
        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.spriteBody = this.body;
            this.spriteBody.acceleration.y = 100;
            this.game.add.existing(this);
        }
        init(holder: Player) {
            this.holder = holder;
            this.onTeam = holder.onTeam;
            this.holder.heldItems.push(this.key);
            //code to be run only once, when the item is picked up by the player
        }
        effect() {
            //to be called whenever this item is activated
        }

        itemUpdate() {
            //called every fram for any continuous effect
        }
        hitByBullet(bullet: Ammo) {

        }

        static init() {
            this.allItems.push(Coffee);
            this.allItems.push(Kamikaze);
            this.allItems.push(LazerGun);
            this.allItems.push(Shield);
            this.allItems.push(SniperGun);
            this.allItems.push(Radar);
            this.allItems.push(Heart);
            this.allItems.push(BoomerangGun);
            this.allItems.push(ChargingLazerGun);
            this.allItems.push(Blink);
            this.allItems.push(Jetpack);
            this.allItems.push(BottleOfJack);
            this.allItems.push(Scope);
            this.allItems.push(Banana);
            this.allItems.push(Bomb);
            this.allItems.push(RocketLauncher);
            for (var i = 0; i < this.allItems.length; i++) {
                this.allItems[i].timesDropped = 0;
            }
        }
        static randomItem(game: Phaser.Game, x: number, y: number) {
             //return new this.allItems[this.allItems.length - 1](game, x, y);
            while (true) {
                var randItem: number = Math.floor(Math.random() * this.allItems.length);
                var dropped: number = Math.random() * 100;
                if (this.allItems[randItem].dropRate > dropped && this.allItems[randItem].timesDropped < this.allItems[randItem].maxDropped) {
                    this.allItems[randItem].timesDropped++;
                    return new this.allItems[randItem](game, x, y);

                }
            }
        }
    }
} 