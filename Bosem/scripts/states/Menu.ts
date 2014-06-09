module Bosem {
    export class Menu extends Phaser.State {
        sprite2: Phaser.Image;
        enter: Phaser.Key;

        preload() {
            this.game.add.image(0, 0, ResKeys.menuImage1);
            this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            
        }
        create() {
            var tween = this.add.tween(ResKeys.menuImage2).to({ y: 500 }, 5000, Phaser.Easing.Bounce.InOut, true);

            this.sprite2 = this.game.add.image(this.game.world.centerX, -50, ResKeys.menuImage2);

            // Set origin to the center to make the rotation look better.
            this.sprite2.anchor.setTo(0.5, 0.5);

            // Add a simple bounce tween to each character's position.
            tween = this.game.add.tween(this.sprite2).to({ y: 500 }, 2400, Phaser.Easing.Bounce.Out, true);

            this.game.add.image(0, 0, ResKeys.controlsPic);

        }

        update() {
            if (this.enter.isDown) {
                this.game.state.start(ResKeys.battleState);
            }
        }
    }
} 