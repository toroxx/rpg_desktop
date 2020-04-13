import * as PIXI from 'pixi.js';
class Tile {
    constructor(tileMap, textures, options) {
        const { x, y, w, h, tile_id } = options;

        this.layers = [];
        for (let k in textures) {
            let [texture, zIndex] = textures[k];
            //console.log(texture, zIndex, tile_id);
            let back = new PIXI.Sprite(texture);
            back.x = x;
            back.y = y;
            back.width = w;
            back.height = h;
            back.zIndex = zIndex;
            this.layers.push(back);
            tileMap.addChild(back);
        }


        this.text = new PIXI.Text("", {
            fontFamily: 'Arial', fontSize: 9, fill: 0xff1010, align: 'center'
        });
        this.text.x = x + ((w - this.text.width) / 2);
        this.text.y = y + ((h - this.text.height) / 2);
        this.text.zIndex = 10;
        tileMap.addChild(this.text);
    }

    getLayers() {
        return this.layers[level];
    }

    setLayerTexture(level, texture) {
        this.layers[level].texture = texture;
    }
    setText(text) {
        this.text.text = text;
    }
}


export default Tile;
