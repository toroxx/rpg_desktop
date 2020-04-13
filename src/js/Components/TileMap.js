import * as PIXI from 'pixi.js';
import Tile from './Tile';

import * as BG from '../Textures/Background';

class TileMap extends PIXI.Container {
    constructor(tile_w, tile_h, count_w, count_h, cx, cy) {
        super();
        this.cx = cx;
        this.cy = cy;
        this.tile_w = tile_w;
        this.tile_h = tile_h;
        this.count_w = count_w;
        this.count_h = count_h;

        //background
        let bg = new PIXI.Container();
        this.bglayer = bg;
        this.addChild(bg);

        //mask
        var px_mask_outter_bounds = new PIXI.Graphics();
        px_mask_outter_bounds.beginFill(0xFFFFFF);
        px_mask_outter_bounds.drawRect(0, 0, tile_w * count_w, tile_h * count_h);
        px_mask_outter_bounds.endFill();

        this.addChild(px_mask_outter_bounds);
        this.mask = px_mask_outter_bounds;
        this.map_json = null;
        this.sortableChildren = true;


        this.tiles = {};
    }

    loadMap(map_json) {
        this.map_json = map_json;
        const { map, item } = map_json;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                let tile_id = map[y][x];

                let textures = [[PIXI.Texture.EMPTY, 1]];

                const { layers } = item[tile_id];
                if (layers != null) {
                    for (let k in layers) {
                        const { bg = null, id = null, zIndex = 1 } = layers[k];
                        if (BG[bg] && BG[bg][id]) {
                            textures.push([BG[bg][id], zIndex]);
                        }
                    }
                }


                const tile = new Tile(this.bglayer, textures, { tile_id: tile_id, x: x * this.tile_w, y: y * this.tile_h, w: this.tile_w, h: this.tile_h });
                this.tiles[x + ':' + y] = tile;
            }
        }
    }

    getBackground() {
        return this.bglayer;
    }

    getTileData(x, y) {
        const { map, item } = this.map_json;
        let tile_id = map[y][x];
        if (item[tile_id] != undefined) {
            return item[tile_id];
        }
        return null;
    }

    getTile(x, y) {
        const { map, item } = this.map_json;
        let tile_id = map[y][x];
        if (item[tile_id] != undefined) {
            return item[tile_id];
        }
        return null;
    }

    getTileWidth() {
        return this.tile_w;
    }
    getTileHeight() {
        return this.tile_h;
    }

    moveTo(x, y) {

        this.bglayer.x = this.tile_w * (this.cx - x);
        this.bglayer.y = this.tile_h * (this.cy - y);


    }
}

export default TileMap;





