// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0b00080005050505050505050505050004030303030303030301000202020202020202020200040303030303030303010002020202020202020202000403030303030303030100020202020202020202020004030303030303030301`, img`
. . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
2 . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tilePath6,sprites.castle.tilePath5,sprites.castle.tileGrass3,sprites.castle.tileGrass2,sprites.castle.tileGrass1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
