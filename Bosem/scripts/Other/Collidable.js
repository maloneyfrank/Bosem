var Bosem;
(function (Bosem) {
    var Collidable = (function () {
        function Collidable() {
        }
        Collidable.init = function (game) {
            this.game = game;
            this.collidables = this.game.add.group();
        };
        Collidable.addCollidable = function (collidable) {
            this.collidables.add(collidable);
        };

        Collidable.removeCollidable = function (collidable) {
            collidable.destroy();
            this.collidables.remove(collidable, true);
        };
        Collidable.getCollidables = function () {
            return this.collidables;
        };
        return Collidable;
    })();
    Bosem.Collidable = Collidable;
})(Bosem || (Bosem = {}));
