var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bosem;
(function (Bosem) {
    var CityMap = (function (_super) {
        __extends(CityMap, _super);
        function CityMap() {
            _super.apply(this, arguments);
        }
        CityMap.mapKey = Bosem.ResKeys.cityMap;
        CityMap.tileSetImageKey = Bosem.ResKeys.cityTiles;
        CityMap.backgroundImage = Bosem.ResKeys.cityBackgroundString;
        CityMap.bgWidth = 502;
        CityMap.bgHeight = 402;
        return CityMap;
    })(Bosem.BosemMap);
    Bosem.CityMap = CityMap;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=CityMap.js.map
