﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var Blink = (function (_super) {
        __extends(Blink, _super);
        function Blink(game, x, y) {
            _super.call(this, game, x, y, Bosem.ResKeys.blink);
        }
        Blink.prototype.init = function (holder) {
            _super.prototype.init.call(this, holder);
            this.holder.useItem = this;
        };
        Blink.prototype.effect = function () {
            if (this.holder.jump.isDown)
                this.holder.y -= 500;
            else if (this.holder.facingLeft) {
                if (this.holder.x - 500 > this.game.camera.x)
                    this.holder.spriteBody.position.x -= 500;
                else
                    this.holder.spriteBody.position.x = this.game.camera.x + 1;
            } else {
                if (this.holder.x + 500 < this.game.camera.x + this.game.camera.width)
                    this.holder.spriteBody.position.x += 500;
                else
                    this.holder.spriteBody.position.x = this.game.camera.x + this.game.camera.width - this.holder.width - 1;
            }

            this.holder.useItem = null;
            this.destroy();
        };
        Blink.dropRate = 50;
        return Blink;
    })(Bosem.Item);
    Bosem.Blink = Blink;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=Blink.js.map
