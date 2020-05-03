import * as PIXI from 'pixi.js';
let levels = {};



function setupLevel(target) {
    for (let i = target.min_level; i <= target.max_level; i++) {
        target.getDisplayLevel(i);
    }
}

class Stage extends PIXI.display.Stage {
    constructor(app, tile_size, min_level, max_level) {
        super();
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
}

export default Stage;