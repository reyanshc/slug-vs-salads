namespace SpriteKind {
    export const Slug = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const Tower = SpriteKind.create()
    export const DeadSlug = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursoRow += -1
    if (cursoRow <= 1) {
        cursoRow = 0
    }
    tiles.placeOnTile(thecursor, tiles.getTileLocation(cursorCol, cursoRow))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thecursor.tileKindAt(TileDirection.Center, sprites.castle.tileGrass3) && info.score() > 250) {
        info.changeScoreBy(-100)
        tower = sprites.create(img`
            . . . . . . . e e e e . . . . . 
            . . . . . e e 4 5 5 5 e e . . . 
            . . . . e 4 5 6 2 2 7 6 6 e . . 
            . . . e 5 6 6 7 2 2 6 4 4 4 e . 
            . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
            . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
            . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
            e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
            e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
            e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
            e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
            e 5 e c 5 4 5 4 5 5 5 e e . . . 
            e 5 e e 5 5 5 5 5 4 e . . . . . 
            4 5 4 e 5 5 5 5 e e . . . . . . 
            . 4 5 4 5 5 4 e . . . . . . . . 
            . . 4 4 e e e . . . . . . . . . 
            `, SpriteKind.Tower)
        tiles.placeOnTile(tower, tiles.getTileLocation(cursorCol, cursoRow))
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorCol += -1
    if (cursorCol <= 0) {
        cursorCol = 0
    }
    tiles.placeOnTile(thecursor, tiles.getTileLocation(cursorCol, cursoRow))
})
info.onCountdownEnd(function () {
    start_wave()
})
scene.onOverlapTile(SpriteKind.Slug, sprites.castle.tileGrass2, function (sprite, location) {
    info.changeLifeBy(-1)
    sprite.x += 4
    scene.cameraShake(2, 500)
})
sprites.onOverlap(SpriteKind.Slug, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    sprites.changeDataNumberBy(sprite, "life", -1)
    if (sprites.readDataNumber(sprite, "life") == 0) {
        DeadSlug = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 . 2 . . . . . . . . . 
            . . . . 2 . 2 . . . . . . . . . 
            . . . . 2 2 2 2 2 . . . . . . . 
            . . . e e e e e 2 2 . . . . . . 
            . . . 2 e 2 e e e e e 2 e e . . 
            . . . f 2 f f e 2 2 e 2 e 2 . . 
            . . . f 2 f f d d d d d d 2 2 2 
            . . d f f f 2 d 2 d d d d d 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.DeadSlug)
        DeadSlug.setFlag(SpriteFlag.Ghost, true)
        DeadSlug.x = sprite.x
        DeadSlug.y = sprite.y
        DeadSlug.lifespan = 3000
        sprite.destroy()
    } else {
    	
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorCol += 1
    if (cursorCol >= 0) {
        cursorCol = 10
    }
    tiles.placeOnTile(thecursor, tiles.getTileLocation(cursorCol, cursoRow))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursoRow += 1
    if (cursoRow <= 0) {
        cursoRow = 10
    }
    tiles.placeOnTile(thecursor, tiles.getTileLocation(cursorCol, cursoRow))
})
function start_wave () {
    SLUG_LIFE += 1
    scene.cameraShake(4, 500)
    for (let value of sprites.allOfKind(SpriteKind.Tower)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Slug)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.DeadSlug)) {
        value.destroy()
    }
    game.splash("Wave" + (SLUG_LIFE - 0))
    info.setLife(3000)
    info.startCountdown(25)
}
let tomato: Sprite = null
let sprite_list: Sprite[] = []
let projectile: Sprite = null
let DeadSlug: Sprite = null
let tower: Sprite = null
let SLUG_LIFE = 0
let cursoRow = 0
let cursorCol = 0
let thecursor: Sprite = null
start_wave()
tiles.setCurrentTilemap(tilemap`level1`)
info.setLife(3000)
scene.centerCameraAt(110, 70)
thecursor = sprites.create(img`
    . . 5 5 5 5 5 5 5 . 5 5 5 . 5 f 
    . 5 f f f . . . 5 5 5 . 5 5 5 f 
    5 f f . . f f . . . . . . . 5 5 
    5 f . . . . . . . . . . . . . . 
    5 f . . . . . . . . . . . . 5 f 
    5 f . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 5 f 
    5 f . . . . . . . . . . . . 5 f 
    5 f . . . . . . 2 . . . . . . . 
    5 f . . . . . . . . . . . . 5 f 
    5 f . . . . . . . . . . . . 5 f 
    . . . . . . . . . . . . . . . . 
    . 5 f . . . . . . . . . . . . . 
    . 5 . . . . . . . f . . . . 5 f 
    . 5 f . . . . . f 5 5 5 f . 5 f 
    . 5 5 5 5 5 5 5 5 5 . 5 f 5 5 . 
    `, SpriteKind.Cursor)
cursorCol = 4
cursoRow = 4
tiles.placeOnTile(thecursor, tiles.getTileLocation(cursorCol, cursoRow))
SLUG_LIFE = 1
info.startCountdown(25)
game.onUpdate(function () {
    info.changeScoreBy(1)
})
game.onUpdate(function () {
    if (info.score() == 1500) {
        game.reset()
    }
})
game.onUpdateInterval(1750, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 2 . 2 . . . . . . . . . 
        . . . . f . f . . . . . . . . . 
        . . . . f . f . . . . . . . . . 
        . . . e e e e e . . . . . . . . 
        . . . e e e e e e e e e e e . . 
        . . . f d f f e e e e e e e . . 
        . . . f f f f d d d d d d d d . 
        . . d d d d d d d d d d d d d . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, -10, 0)
    projectile.setKind(SpriteKind.Slug)
    sprites.setDataNumber(projectile, "life", SLUG_LIFE)
    tiles.placeOnRandomTile(projectile, sprites.castle.tilePath6)
})
game.onUpdateInterval(1500, function () {
    sprite_list = sprites.allOfKind(SpriteKind.Tower)
    for (let value of sprite_list) {
        tomato = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 7 . . 7 7 7 7 . . . . . 
            . . . . 4 7 7 2 2 2 2 . . . . . 
            . . . . 7 4 2 2 4 4 2 . . . . . 
            . . . . 7 4 2 2 4 4 2 . . . . . 
            . . . . 4 7 7 2 2 2 2 . . . . . 
            . . . . 7 . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, value, 50, 0)
    }
})
