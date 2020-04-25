
import * as PIXI from 'pixi.js'
import * as Util from '../Util';

const elems = Util.load_asset_resources('elements');

for (let k in elems) {
    const { path, row_per_tile, tile_size, width, height } = elems[k];
    const base = new PIXI.BaseTexture(path);
    let p = [];

    let wCount = width / tile_size;
    let hCount = height / tile_size;
    elems[k]['w_count'] = wCount;
    elems[k]['h_count'] = hCount;

    for (let y = 0; y < hCount; y++) {
        for (let x = 0; x < wCount; x++) {
            const tmp = new PIXI.Texture(base, new PIXI.Rectangle(tile_size * x, tile_size * y, tile_size, tile_size));
            p.push(tmp);
        }
    }
    elems[k]['texture'] = p;
}
export default { ...elems };
