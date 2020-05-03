import * as PIXI from 'pixi.js';
import Tile from './Tile';
import AnimateClock from './AnimateClock';

import Maps from '../Textures/Maps';


class TileMap extends PIXI.Container {
    constructor(app, stage, tile_size) {
        super();

        this.app = app;
        this.stage = stage;
        this.tile_size = tile_size;
        this.tileMap = {};
        this.map_name = '';
        this.clock = null;
    }

    getMaps() {
        return Maps;
    }


    getTileCount() {
        return [
            Math.floor(this.app.screen.width / this.tile_size),
            Math.floor(this.app.screen.height / this.tile_size)
        ]
    }
    getMapSize() {
        let x = 0, y = Object.keys(this.tileMap).length;
        if (y > 0) {
            x = Object.keys(this.tileMap[0]).length;
        }
        return [x, y];

    }
    getTileCenter() {
        let [col, row] = this.getTileCount();
        return [Math.floor(col / 2), Math.floor(row / 2)];
    }
    getTile(x, y) {
        return (this.tileMap && this.tileMap[y] && this.tileMap[y][x]) || [];
    }

    getInfoTiles() {
        if (!Maps[this.map_name]) {
            return {};
        }
        let { infoTiles } = Maps[this.map_name];
        return infoTiles;
    }
    getEntryPoints() {
        if (!Maps[this.map_name]) {
            return {};
        }
        let { map, item, mapTileOption, infoTiles } = Maps[this.map_name];

        let p = {};
        for (let k in infoTiles) {
            if (infoTiles[k].params.entrypoint) {
                p[k] = infoTiles[k].tiles[0];
            }
        }
        return p;
    }

    moveTo(x = -1, y = -1, speed = 500) {
        let [col, row] = this.getTileCenter();
        //console.log('tilemap.moveto', x, y, col, row, this.x, this.y);
        let nx = (col);
        let ny = (row);
        if (x > -1) {
            nx += -x;
        }
        if (y > -1) {
            ny += -y;
        }
        //console.log('tilemap.moveto2', x, y, col, row, nx, ny);
        if (speed == 0) {
            this.x = nx * this.tile_size;
            this.y = ny * this.tile_size;
            return;
        }

        let coords = { x: this.x, y: this.y };
        let tween = new TWEEN.Tween(coords)
            .to({ x: nx * this.tile_size, y: ny * this.tile_size }, speed)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(() => {
                this.x = coords.x;
                this.y = coords.y;
            })
            .start();
    }
    clearMap() {
        for (let y in this.tileMap) {
            let row = this.tileMap[y];
            for (let x in row) {
                let tile_info = this.tileMap[y][x];
                this.removeChild(tile_info);
            }
        }

        this.tileMap = {};
    }

    loadMap(map_name) {
        this.clearMap();
        this.map_name = map_name;
        let { map, item, mapTileOption, infoTiles } = Maps[this.map_name];

        if (this.clock != null) {
            this.clock.destroy();
        }
        this.clock = new AnimateClock(this.app, map, item, mapTileOption, 4,
            this.animation_callback.bind(this));


        map.map((row, y) => {
            row.map((tile_info, x) => {
                if (this.tileMap[y] == void (0)) {
                    this.tileMap[y] = {};
                }
                if (this.tileMap[y][x] == void (0)) {
                    this.tileMap[y][x] = {};
                }
                const tile = new Tile(this.stage, tile_info, item, infoTiles, this.tile_size, x, y);

                this.addChild(tile);

                this.tileMap[y][x] = tile;

            });
        })
    }

    goToMapEntryPoint(map_name, entrypoint, player) {
        this.loadMap(map_name);
        let entrypoints = this.getEntryPoints();

        let [tile_id, i, x, y] = entrypoints[entrypoint]
        player.moveTo(x, y, 0);
        this.moveTo(x, y, 0);
    }

    animation_callback(tile_ani_layer, InfoID, TileID, framePerLoop, y, x, txtClock) {
        let { named } = this.getTile(x, y);

        let { layers } = tile_ani_layer;
        let anis = {};
        let closest = 0;
        for (let k in layers) {
            let { name, ani, zIndex } = layers[k];
            ani *= framePerLoop;
            anis[ani] = [name, zIndex];

            if (txtClock > ani) {
                closest = ani;
            }
        }

        for (let ani in anis) {
            const [name, zIndex] = anis[ani];
            const layer = named[name];
            if (layer == void (0)) {
                continue;
            }
            layer.parentLayer = this.stage.getDisplayLevel((ani == closest ? zIndex : -1));
        }
    }

    tileclick_callback(e) {
        console.log(e.target);
    }


}

export default TileMap;





