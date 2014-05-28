var Bosem;
(function (Bosem) {
    var ItemManager = (function () {
        function ItemManager() {
        }
        ItemManager.init = function (game, type) {
            this.game = game;
            this.type = type;

            this.itemsInGame = this.game.add.group();
            switch (this.type) {
                case this.ON_TIME_INTERVAL:
                    this.timer = this.game.time.create(false);
                    this.timer.loop(this.timeInterval, this.onTimeInterval, this);
                    this.timer.start();
                    break;
                case this.ON_TIME_INTERVAL_AND_SPAWN:
                    this.timer = this.game.time.create(false);
                    this.timer.loop(this.timeInterval, this.onTimeInterval, this);
                    this.timer.start();
                    break;
            }
        };
        ItemManager.setTimeInterval = function (newTimeInterval) {
            this.timeInterval = newTimeInterval;
            this.timer.stop();
            this.timer.destroy;
            this.timer = this.game.time.create(false);
            this.timer.loop(this.timeInterval, this.onTimeInterval, this);
            this.timer.start();
        };
        ItemManager.update = function () {
            this.itemsInGame.forEach(this.itemGetCheck, this);
        };

        ItemManager.itemGetCheck = function (item) {
            var players = Bosem.KillableInGame.getPlayers();
            for (var i = 0; i < players.length; i++) {
                if (this.game.physics.arcade.collide(item, players[i])) {
                    item.init(players[i]);
                    this.itemsInGame.remove(item);
                }
            }
        };

        ItemManager.onTimeInterval = function () {
            var x = Math.floor(Math.random() * this.game.world.width);
            this.itemsInGame.add(Bosem.Item.randomItem(this.game, x, 10));
        };
        ItemManager.spawnItem = function (x, y) {
            if (this.type == this.ON_SPAWN || this.type == this.ON_TIME_INTERVAL_AND_SPAWN) {
                this.itemsInGame.add(Bosem.Item.randomItem(this.game, x, y));
            }
        };
        ItemManager.ON_SPAWN = 1;
        ItemManager.ON_TIME_INTERVAL = 0;
        ItemManager.ON_TIME_INTERVAL_AND_SPAWN = 2;

        ItemManager.timeInterval = 5000;
        return ItemManager;
    })();
    Bosem.ItemManager = ItemManager;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=ItemManager.js.map
