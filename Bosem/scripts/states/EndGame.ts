module Bosem{
    export class EndGame extends Phaser.State {
        numPlayers: number;
        announcement: string;
        playerItems: string[][];
        startMenuKey: Phaser.Key;
        preload() {
            this.game.stage.backgroundColor = '#000000';
            this.numPlayers = +localStorage.getItem('numPlayers');
            var loser: number = +localStorage.getItem('loser');
            this.announcement = "Player " + (loser+1).toString() + " has lost";

            this.playerItems = [];
            for (var i = 0; i < this.numPlayers; i++) {
                var thisPlayersItems: string[] = [];
                var itemResKeys: string = localStorage.getItem("playerItems" + i.toString());
                for (var j = 0; j < itemResKeys.length; j++) {
                    if (itemResKeys.charAt(j) == '|') {
                        var resKey: string = itemResKeys.substr(0, j);
                        itemResKeys = itemResKeys.substring(j + 1);
                        j = 0;
                        if(resKey.length > 2)
                             thisPlayersItems.push(resKey);
                    }
                }
                this.playerItems.push(thisPlayersItems);
            }

           this.startMenuKey =  this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        }
        create() {
            this.game.add.text(20, 20, this.announcement, { font: '34px Arial', fill: '#fff' });


            this.game.add.text(this.game.width / 2 - this.game.width/5, 50, 'Press Enter To Continue', { font: '15px Arial', fill: '#fff' });

            this.game.add.image(this.game.width / 4, 100, ResKeys.player1Sprite, 0);
            this.game.add.text(this.game.width / 4 - 10, 170, 'Player 1', { font: '15px Arial', fill: '#fff' });

            this.game.add.image(this.game.width * 3 / 4, 100, ResKeys.player2Sprite, 0);
            this.game.add.text(this.game.width * 3 / 4 - 10, 170, 'Player 2', { font: '15px Arial', fill: '#fff' });


            for (var i = 0; i < this.playerItems[0].length; i++) {
                var x: number = i % 3 * 80 + this.game.width/6;
                var y: number = Math.floor(i / 3) * 80 + 250;
                this.game.add.image(x, y, this.playerItems[0][i]);
            }
            for (var i = 0; i < this.playerItems[1].length; i++) {
                var x: number = i % 3 * 80 + this.game.width * 4/6;
                var y: number = Math.floor(i / 3) * 80 + 250;
                this.game.add.image(x, y, this.playerItems[1][i]);
            }
        }
        update() {
            if (this.startMenuKey.isDown) {
                this.game.state.start(ResKeys.menuState, true, false);
            }
        }


    }

} 