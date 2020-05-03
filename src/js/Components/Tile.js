import * as PIXI from 'pixi.js';

class Tile extends PIXI.Container {
    constructor(stage, tile_info, item, infoTiles, tile_size, x, y) {
        super();
        this.stage = stage;
        this.interactive = true;
        let { TileID = null, InfoID = null } = tile_info;
        let { layers, ...opts } = item[TileID] || [];
        let info = infoTiles[InfoID] || [];

        this.tileID = TileID;
        this.InfoID = InfoID;
        this.opts = opts;
        this.info = info;

        this.x = x * tile_size;
        this.y = y * tile_size;
        this.width = tile_size;
        this.height = tile_size;
        this.highlightable = true;




        let tile_rect = { x: 0, y: 0, width: tile_size, height: tile_size };
        this.makeLayers(layers, tile_rect);
        //back.mask = mask;


        const graphics = this.tileOptionClasses(tile_rect, opts);
        graphics.parentLayer = stage.getDisplayLevel(14);
        //this.addChild(graphics);

        const text = new PIXI.Text(x + "=" + y);
        text.x = 0;
        text.y = 0;
        text.style = new PIXI.TextStyle({ fontSize: '10px', fill: 0xffffff })
        text.parentLayer = stage.getDisplayLevelMax();
        //console.log(x + "=" + y, text.width, text.height)
        this.addChild(text);

        const highlight = new PIXI.Graphics();
        highlight.x = 0;
        highlight.y = 0;
        highlight.lineStyle(2, 0xFFFF00, 1);
        highlight.beginFill(0xFFFF00, 0.2);
        highlight.drawRect(0, 0, tile_size, tile_size);
        highlight.endFill();
        highlight.parentLayer = stage.getDisplayLevelMax();
        this.highlight = highlight;


        this.on('pointerdown', this.onButtonDown.bind(this))
            .on('pointerup', this.onButtonUp.bind(this))
            .on('pointerupoutside', this.onButtonUp.bind(this))
            .on('pointerover', this.onButtonOver.bind(this))
            .on('pointerout', this.onButtonOut.bind(this));
    }

    onButtonDown() {
        this.isdown = true;
        //this.texture = textureButtonDown;
    }

    onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            //this.texture = textureButtonOver;
        } else {
            // this.texture = textureButton;
        }
    }

    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        if (this.highlightable) {
            this.addChild(this.highlight);
        }
        //this.texture = textureButtonOver;
    }

    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        if (this.highlightable) {
            this.removeChild(this.highlight);
        }
        //this.texture = textureButton;
    }

    makeLayers(layers, tile_rect, mask = null) {

        let tileLayers = {};
        let namedLayers = {};
        if (layers != null) {
            for (let layer of layers) {
                let { zIndex = 1, bg, id, name, ani, texture } = layer;

                zIndex = parseInt(zIndex);
                let back = new PIXI.Sprite(texture);
                back = Object.assign(back, {
                    ...tile_rect, parentLayer: this.stage.getDisplayLevel(zIndex)
                });
                //console.log(zIndex, back.x, back.y, back.width, back.height);
                back.mask = mask;

                namedLayers[name] = back;
                tileLayers[zIndex] = back;
                this.addChild(back);
            }
        }
        this.named = namedLayers;
        this.layers = tileLayers;
    }

    tileOptionClasses(tile_rect, option) {
        let { x, y, width, height } = tile_rect;
        let effclass = [];
        let i = option;

        const graphics = new PIXI.Graphics();
        if (i['walkover'] === void (0) || i['walkover'] != true) {
            // graphics.lineStyle(1, 0xFF0000, 1);
            // graphics.drawRect(...Object.values(tile_rect));
            this.highlightable = false;
        }
        if (i['moveleft'] == false) {
            effclass.push("non_moveleft");
            graphics.lineStyle(1, 0xFF0000, 1);
            graphics.moveTo(x + 1, y + 1);
            graphics.lineTo(x + 1, y - 1 + height);
        }
        if (i['moveright'] == false) {
            effclass.push("non_moveright");
            graphics.lineStyle(1, 0xFF0000, 1);
            graphics.moveTo(x + width - 1, y + 1);
            graphics.lineTo(x + width - 1, y - 1 + height);

        }
        if (i['moveup'] == false) {
            effclass.push("non_moveup");
            graphics.lineStyle(1, 0xFF0000, 1);
            graphics.moveTo(x + 1, y + 1);
            graphics.lineTo(x - 1 + width, y + 1);
        }
        if (i['movedown'] == false) {
            effclass.push("non_movedown");
            graphics.lineStyle(1, 0xFF0000, 1);
            graphics.moveTo(x + 1, y + height - 1);
            graphics.lineTo(x - 1 + width, y + height - 1);
        }

        if (i['eventdown'] == true) {
            effclass.push("eventdown");
            graphics.lineStyle(1, 0x00FF00, 1);
            graphics.moveTo(x + 2, y + height - 2);
            graphics.lineTo(x - 2 + width, y + height - 2);
        }
        if (i['eventleft'] == true) {
            effclass.push("eventleft");
            graphics.lineStyle(1, 0x00FF00, 1);
            graphics.moveTo(x + 2, y + 2);
            graphics.lineTo(x + 2, y - 2 + height);
        }
        if (i['eventup'] == true) {
            effclass.push("eventup");
            graphics.lineStyle(1, 0x00FF00, 1);
            graphics.moveTo(x + 2, y + 2);
            graphics.lineTo(x - 2 + width, y + 2);
        }
        if (i['eventright'] == true) {
            effclass.push("eventright");
            graphics.lineStyle(1, 0x00FF00, 1);
            graphics.moveTo(x + width - 2, y + 2);
            graphics.lineTo(x + width - 2, y - 2 + height);

        }
        return graphics;
    }
}


export default Tile;