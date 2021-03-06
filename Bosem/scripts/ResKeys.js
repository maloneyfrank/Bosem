﻿var Bosem;
(function (Bosem) {
    var ResKeys = (function () {
        function ResKeys() {
        }
        ResKeys.player1Sprite = "player1";
        ResKeys.player2Sprite = "player2";
        ResKeys.bootState = 'Boot';
        ResKeys.battleState = 'Battle';
        ResKeys.menuState = 'Menu';
        ResKeys.startButtonSprite = 'startButton';
        ResKeys.preloaderState = 'Preloader';
        ResKeys.map1 = 'map1';
        ResKeys.bricks = 'tiles1';

        ResKeys.movingRightAttackAnimation = 'movingRightAttack';
        ResKeys.movingLeftAttackAnimation = 'movingLeftAttack';
        ResKeys.stillLeftAnimation = 'stillLeft';
        ResKeys.stillRightAnimation = 'stillRight';
        ResKeys.stillAttackRight = 'stillAttackRight';
        ResKeys.stillAttackLeft = 'stillAttackLeft';
        ResKeys.movingLeft = 'movingLeft';
        ResKeys.movingRight = 'movingRight';
        ResKeys.jumpRight = 'jumpRight';
        ResKeys.jumpLeft = 'jumpLeft';
        ResKeys.collisionSpriteSheet = 'collisionSpriteSheet';
        ResKeys.flameAmmo = 'flameAmmo';
        ResKeys.flameAnim = 'flameAnim';
        ResKeys.player1Health = 'p1Health';
        ResKeys.player2Health = 'p2Health';

        ResKeys.lazerAmmo = 'lazerAmmo';

        ResKeys.fishSprite = 'fishSprite';
        ResKeys.cofee = 'coffeeSprite';
        ResKeys.shield = 'shieldSprite';
        ResKeys.fishLeft = 'fishLeft';
        ResKeys.fishRight = 'fishRight';
        ResKeys.kamikaze = 'kamikazeSprite';
        ResKeys.tabasco = 'tabascoSprite';
        ResKeys.lazerGun = 'lazerGunSprite';
        return ResKeys;
    })();
    Bosem.ResKeys = ResKeys;
})(Bosem || (Bosem = {}));
//# sourceMappingURL=ResKeys.js.map
