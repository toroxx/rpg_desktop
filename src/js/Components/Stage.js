import * as PIXI from 'pixi.js';
let levels = {};


function screen_resize(target) {
    let { app } = target;
    let WIDTH = app.screen.width;
    let HEIGHT = app.screen.height;

    let ratio = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    //console.log('screen', window.innerWidth, window.innerHeight, WIDTH, HEIGHT, ratio);

    app.stage.scale.x = app.stage.scale.y = ratio;
    app.renderer.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));

    target.ratio = ratio;
}

function setupScreenResize(target) {
    setTimeout(() => {
        screen_resize(target);
    }, 1);

    window.addEventListener('resize', () => {
        // Resize the renderer
        screen_resize(target);
    });

}
function setupLevel(target) {
    for (let i = target.min_level; i <= target.max_level; i++) {
        target.getDisplayLevel(i);
    }
}

class Stage extends PIXI.display.Stage {
    constructor(app, tile_size, min_level, max_level) {
        super();
        let WIDTH = app.screen.width;
        let HEIGHT = app.screen.height;

        this.app = app;
        this.width = WIDTH;
        this.height = HEIGHT;
        this.tile_size = tile_size;
        this.min_level = min_level;
        this.max_level = max_level;

        setupScreenResize(this);
        setupLevel(this);


    }

    getTileMaxBound() {
        let x = Math.floor(this.app.screen.width / this.tile_size);
        let y = Math.floor(this.app.screen.height / this.tile_size);
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
}

export default Stage;