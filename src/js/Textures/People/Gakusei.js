
import * as PIXI from 'pixi.js'

const { app: ele_app } = electron.remote;
const rootpath = ele_app.getAppPath();
const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 48;
const HEIGHT = 48;

const base = new PIXI.BaseTexture(assets_path + '/people/Actor_gakusei.png');

let p = { 'p1': [], 'p2': [], 'p3': [], 'p4': [] };

let po = 0;
for (let y = 0; y < 4; y++) {
    let z = 0;
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

for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 3; x++) {
        const tmp = new PIXI.Texture(base, new PIXI.Rectangle(WIDTH * x, HEIGHT * (y + 4), WIDTH, HEIGHT));
        if (p["p" + (y + 1)][po] == undefined) {
            p["p" + (y + 1)][po] = [];
        }

        p["p" + (y + 1)][po].push(tmp);
    }
}

export default p;
