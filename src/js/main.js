'use strict';
import '../scss/main.scss';
import * as PIXI from 'pixi.js';

import * as Stages from './Stages';

//http://yms.main.jp/dotartworld
//https://bb-entertainment-blog.blogspot.com/
const { app: ele_app, getCurrentWindow, ipcRenderer } = electron.remote;
const rootpath = ele_app.getAppPath();
getCurrentWindow().setTitle('RPG v' + pjson.version);


const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 1024;
const HEIGHT = 576;
const tile_size = 48;
const min_level = -1;
const max_level = 60;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const pixi = new PIXI.Application({
    width: WIDTH, height: HEIGHT,
    autoResize: true,
    //antialias: true,
    resolution: devicePixelRatio
});

pixi.ticker.add(dt => gameLoop(dt));
function gameLoop() {
    var dt = pixi.ticker.elapsedMS / 1000;
    TWEEN.update(pixi.ticker.lastTime);
}
document.body.appendChild(pixi.view);

pixi.stage = new Stages.Main(pixi, tile_size, min_level, max_level);
pixi.stage.x = 0;
pixi.stage.y = 0;
pixi.stage.sortableChildren = true;


window.addEventListener('keydown', function (e) {
    pixi.stage.keydownHandler(e)
})




