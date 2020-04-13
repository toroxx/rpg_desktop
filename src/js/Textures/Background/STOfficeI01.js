
import * as PIXI from 'pixi.js'

const { app: ele_app } = electron.remote;
const rootpath = ele_app.getAppPath();
const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 32;
const HEIGHT = 32;

const base = new PIXI.BaseTexture(assets_path + '/elements/ST-Office-I01.png');

let p = [];

let y = 0
for (; y < 58; y++) {
    for (let x = 0; x < 8; x++) {
        const tmp = new PIXI.Texture(base, new PIXI.Rectangle(WIDTH * x, HEIGHT * y, WIDTH, HEIGHT));
        p.push(tmp);
    }
}



export default p;
