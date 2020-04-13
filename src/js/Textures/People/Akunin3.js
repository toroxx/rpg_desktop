
import * as PIXI from 'pixi.js'

const { app: ele_app } = electron.remote;
const rootpath = ele_app.getAppPath();
const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 48;
const HEIGHT = 48;

const base = new PIXI.BaseTexture(assets_path + '/people/BB_akunin3.png');

let p = { 'p1': [], 'p2': [], 'p3': [], 'p4': [], 'p5': [], 'p6': [], 'p7': [], 'p8': [] };

let po = 0;
let y = 0

let z = 0;
for (; y < 4; y++) {
    z = 0;
    for (let x = 0; x < 12; x++) {
        if (x % 3 == 0) {
            z++;
        }

        const tmp = new PIXI.Texture(base, new PIXI.Rectangle(WIDTH * x, HEIGHT * y, WIDTH, HEIGHT));
        if (p["p" + z][po] == undefined) {
            p["p" + z][po] = [];
        }
        p["p" + z][po].push(tmp);
    }
    po++;
}

po = 0;
for (; y < 7; y++) {
    z = 4;
    for (let x = 0; x < 12; x++) {
        if (x % 3 == 0) {
            z++;
        }
        const tmp = new PIXI.Texture(base, new PIXI.Rectangle(WIDTH * x, HEIGHT * y, WIDTH, HEIGHT));
        if (p["p" + z][po] == undefined) {
            p["p" + z][po] = [];
        }
        p["p" + z][po].push(tmp);
    }
    po++;
}

export default p;
