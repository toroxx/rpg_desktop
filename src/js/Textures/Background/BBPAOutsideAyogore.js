
import * as PIXI from 'pixi.js'

const { app: ele_app } = electron.remote;
const rootpath = ele_app.getAppPath();
const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 48;
const HEIGHT = 48;

const base = new PIXI.BaseTexture(assets_path + '/elements/BBPA_Outside_Ayogore.png');

let p = [] ;

let y = 0
for (; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
        const tmp = new PIXI.Texture(base, new PIXI.Rectangle(WIDTH * x, HEIGHT * y, WIDTH, HEIGHT));
        p.push(tmp);
    }
}



export default p;
