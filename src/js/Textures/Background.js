
import * as PIXI from 'pixi.js'
import * as Util from '../Util';
const elems = Util.Asset.load_resources('elements');

for (let k in elems) {
    const { path, filename, row_per_tile, tile_size, width, height,
        wCount, hCount, getXYByID, getScale } = elems[k];

    //console.log(elems[k]);

    const base = new PIXI.BaseTexture(path);
    let p = [];

    for (let y = 0; y < hCount; y++) {
        for (let x = 0; x < wCount; x++) {
            let offset = 0.4;
            let params = [
                tile_size * x + offset,
                tile_size * y + offset,
                tile_size - 2 * offset,
                tile_size - 2 * offset
            ];
            const tmp = new PIXI.Texture(base, new PIXI.Rectangle(...params));
            p.push(tmp);
        }
    }
    elems[k]['textures'] = p;
}
export default { ...elems };
