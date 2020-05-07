import * as PIXI from 'pixi.js';
import * as Components from '../Components';
let levels = {};



function setupLevel(target) {
    for (let i = target.min_level; i <= target.max_level; i++) {
        target.getDisplayLevel(i);
    }
}

class Stage extends PIXI.display.Stage {
    constructor(app, tile_size, min_level, max_level) {
        super();
        this.npcs_mapping = {};
        this.events_mapping = {};

        let WIDTH = app.INIT_WIDTH;
        let HEIGHT = app.INIT_HEIGHT;

        this.app = app;
        this.width = WIDTH;
        this.height = HEIGHT;
        this.tile_size = tile_size;
        this.min_level = min_level;
        this.max_level = max_level;

        setupLevel(this);
    }

    getTileMaxBound() {
        let WIDTH = this.app.INIT_WIDTH;
        let HEIGHT = this.app.INIT_HEIGHT;
        let x = Math.floor(WIDTH / this.tile_size);
        let y = Math.floor(HEIGHT / this.tile_size);
        return [x, y, x * this.tile_size, y * this.tile_size];
    }

    getDisplayLevelMax() {
        return this.getDisplayLevel(this.max_level);
    }

    getDisplayLevelMin() {
        return this.getDisplayLevel(this.min_level);
    }

    getDisplayLevel(zIndex, sorting = true) {
        zIndex = (zIndex == null || isNaN(zIndex) || zIndex == void (0)) ? 1 : zIndex;
        if (levels[zIndex] == void (0)) {

            let gp = new PIXI.display.Group(zIndex, sorting);
            gp.on('sort', (sprite) => {
                sprite.zOrder = -sprite.y;
            })

            let layer = new PIXI.display.Layer(gp);
            layer.group.enableSort = true;

            levels[zIndex] = layer;
            this.addChild(layer);
        }
        return levels[zIndex];
    }

    keydownHandler(e) { }

    screenResizeHandler() {

    }

    setupTileMap(callback = null) {
        const tileMap = new Components.TileMap(this.app, this, this.tile_size, callback);
        this.tileMap = tileMap;
        tileMap.x = 0;
        tileMap.y = 0;
        return tileMap;
    }


    add_character(tile_name, set_id, direction, zIndex) {
        let player = new Components.Character(this.tile_size, tile_name, set_id, direction);
        player.scale.x = 1.25;
        player.scale.y = 1.3;
        player.anchor.set(0.1, 0.3);
        player.parentLayer = this.getDisplayLevel(zIndex);
        return player
    }


    loadNPCS() {
        //clear npcs
        for (let k in this.npcs) {
            this.tileMap.removeChild(this.npcs[k]);
            this.npcs[k] = null;
        }
        this.npcs = {};
        //get npcs
        let nps_list = this.get_npcs(this.tileMap.map_name);
        for (let k in nps_list) {
            let { pos, zIndex = 15, character, opts = {} } = nps_list[k];

            // add npc
            const npc = this.add_character(...character, zIndex);
            npc.opts = opts;
            npc.moveTo(...pos);
            this.npcs[k] = npc;
            this.tileMap.addChild(npc)
        }
    }

    loadMap(map_name, tile_id) {
        let { tileMap, player, messagebox } = this;
        tileMap.goToMapEntryPoint(map_name, tile_id, (x, y) => {
            this.loadNPCS();
            player.moveTo(x, y);
        });
    }

    get_npcs(map_name) {
        console.log(map_name, this.npcs_mapping[map_name])
        return (this.npcs_mapping[map_name]) || {}
    }

    get_event(map_name, token) {
        return (this.events_mapping[map_name] && this.events_mapping[map_name][token]) || void (0)
    }
}

export default Stage;