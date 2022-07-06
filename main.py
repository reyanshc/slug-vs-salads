@namespace
class SpriteKind:
    Slug = SpriteKind.create()
    Cursor = SpriteKind.create()
    Tower = SpriteKind.create()

def on_up_pressed():
    global cursoRow
    cursoRow += -1
    if cursoRow <= 0:
        cursoRow = 0
    tiles.place_on_tile(thecursor, tiles.get_tile_location(cursorCol, cursoRow))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    global tower
    if thecursor.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_grass3):
        tower = sprites.create(img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . .
            """),
            SpriteKind.Tower)
        tiles.place_on_tile(tower, tiles.get_tile_location(cursorCol, cursoRow))
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global cursorCol
    cursorCol += -1
    if cursorCol <= 0:
        cursorCol = 0
    tiles.place_on_tile(thecursor, tiles.get_tile_location(cursorCol, cursoRow))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_overlap_tile(sprite, location):
    info.change_life_by(-1)
    sprite.x += 4
scene.on_overlap_tile(SpriteKind.Slug, sprites.castle.tile_grass2, on_overlap_tile)

def on_right_pressed():
    global cursorCol
    cursorCol += 1
    if cursorCol >= 0:
        cursorCol = 10
    tiles.place_on_tile(thecursor, tiles.get_tile_location(cursorCol, cursoRow))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    global cursoRow
    cursoRow += 1
    if cursoRow <= 0:
        cursoRow = 10
    tiles.place_on_tile(thecursor, tiles.get_tile_location(cursorCol, cursoRow))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

projectile: Sprite = None
tower: Sprite = None
cursoRow = 0
cursorCol = 0
thecursor: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
info.set_life(1000)
scene.center_camera_at(110, 60)
thecursor = sprites.create(img("""
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
    """),
    SpriteKind.Cursor)
cursorCol = 4
cursoRow = 4
tiles.place_on_tile(thecursor, tiles.get_tile_location(cursorCol, cursoRow))

def on_update_interval():
    global projectile
    projectile = sprites.create_projectile_from_side(img("""
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
        """),
        -20,
        0)
    projectile.set_kind(SpriteKind.Slug)
    tiles.place_on_random_tile(projectile, sprites.castle.tile_path6)
game.on_update_interval(1750, on_update_interval)
