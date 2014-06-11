var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var DefaultMap = (function (_super) {
        __extends(DefaultMap, _super);
        function DefaultMap() {
            _super.apply(this, arguments);
        }
        DefaultMap.mapKey = Bosem.ResKeys.map1;
        DefaultMap.tileSetImageKey = 'tiles1';
        return DefaultMap;
    })(Bosem.BosemMap);
    Bosem.DefaultMap = DefaultMap;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=DefaultMap.js.map
