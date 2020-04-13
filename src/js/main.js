'use strict';
import '../scss/main.scss';
import * as PIXI from 'pixi.js';
import { TextInput } from "pixi-textinput-v5";

import * as Core from './Core';
import * as Components from './Components';
import * as People from './Textures/People';
import * as Maps from "./Maps";




//http://yms.main.jp/dotartworld
//https://bb-entertainment-blog.blogspot.com/
const { app: ele_app, BrowserWindow, ipcRenderer } = electron.remote;
const rootpath = ele_app.getAppPath();

const assets_path = path.join(rootpath, '/assets/');

const WIDTH = 1024;
const HEIGHT = 576;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT,
    autoResize: true,
    antialias: true,
    resolution: devicePixelRatio
});

window.addEventListener('resize', resize);

// Resize function window
function resize() {
    // Resize the renderer
    var ratio = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    app.stage.scale.x = app.stage.scale.y = ratio;
    app.renderer.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
}

document.body.appendChild(app.view);






const textInput = new TextInput({
    input: {
        fontSize: '18pt',
        padding: '10px',
        width: '200px',
        height: '30px',
        color: '#26272E'
    },
    //box: {...}
    box: { fill: 0xE8E9F3, rounded: 16, stroke: { color: 0xCBCEE0, width: 4 } }
})
textInput.x = 16;
textInput.y = 16;
textInput.text = 'p4';
textInput.placeholder = 'Enter your Text...   ';
textInput.zIndex = 10;
app.stage.addChild(textInput);

let player_element = {
    char: 'p2', x: 14, y: 6, direction: 3, pos: 1
};

const btn = new Components.Button('Change', { x: 250, y: 16, w: 150, h: 30, r: 16, });
btn.zIndex = 10;
app.stage.addChild(btn);
btn.on('click', function (e) {
    player_element.char = textInput.text;
});


const tile_w = 40;
const tile_h = 40;

const btn1 = new Components.Button('Down', { x: 420, y: 16, w: 50, h: 30, r: 16, });
btn1.zIndex = 10;
app.stage.addChild(btn1);
btn1.on('click', function (e) {
    move('down');
});
const btn2 = new Components.Button('UP', { x: 480, y: 16, w: 50, h: 30, r: 16, }); btn2.zIndex = 10;
app.stage.addChild(btn2);
btn2.on('click', function (e) {
    move('up');
});
const btn3 = new Components.Button('RIGHT', { x: 550, y: 16, w: 50, h: 30, r: 16, }); btn3.zIndex = 10;
app.stage.addChild(btn3);
btn3.on('click', function (e) {
    move('right');
});
const btn4 = new Components.Button('LEFT', { x: 600, y: 16, w: 50, h: 30, r: 16, }); btn4.zIndex = 10;
app.stage.addChild(btn4);
btn4.on('click', function (e) {
    move('left');
});


window.addEventListener('keydown', function (e) {
    let keyMap = {
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'ArrowUp': 'up',
    }
    if (keyMap[e.key]) {
        move(keyMap[e.key]);
    }
})



let text = new PIXI.Text('ID: 0',
    { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
text.x = 850;
text.y = 16;
app.stage.addChild(text);


// map
const tilemap = new Components.TileMap(tile_w, tile_h, 25, 12, 12, 5);
tilemap.width = tile_w * 25;
tilemap.height = tile_h * 12;
tilemap.x = (WIDTH - tile_w * 25) / 2;
tilemap.y = 35 + (HEIGHT - tile_h * 12) / 2;
tilemap.zIndex = 1;
app.stage.addChild(tilemap);

tilemap.loadMap(Maps.Office);
tilemap.moveTo(player_element.x, player_element.y);

const textInput2 = new TextInput({
    input: {
        fontSize: '18pt',
        padding: '10px',
        width: '100px',
        height: '30px',
        color: '#26272E'
    },
    //box: {...}
    box: { fill: 0xE8E9F3, rounded: 16, stroke: { color: 0xCBCEE0, width: 4 } }
})
textInput2.x = 670;
textInput2.y = 16;
textInput2.text = '12:5';
textInput2.placeholder = 'x:y';
textInput2.zIndex = 10;
app.stage.addChild(textInput2);

const btn5 = new Components.Button('Move', { x: 780, y: 16, w: 50, h: 30, r: 16, }); btn4.zIndex = 10;
app.stage.addChild(btn5);
btn5.on('click', function (e) {
    const [x = 12, y = 5] = textInput2.text.split(":");
    let cx = parseInt(x, 10);
    let cy = parseInt(y, 10);
    tilemap.moveTo(cx, cy);
    player_element.x = cx;
    player_element.y = cy;
});




const player_sprite = new PIXI.Sprite(People.Gakusei[player_element.char][player_element.direction][player_element.pos]);
player_sprite.anchor.set(0.15, 0.7);
player_sprite.x = tile_w * 12;
player_sprite.y = tile_h * 5;
player_sprite.scale.x = 1.3;
player_sprite.scale.y = 1.3;
player_sprite.zIndex = 5;
tilemap.getBackground().addChild(player_sprite);

let textures = People.Gakusei[player_element.char][player_element.direction];
player_sprite.texture = textures[player_element.pos];

player_sprite.x = tile_w * (player_element.x);
player_sprite.y = tile_h * (player_element.y);
tilemap.getBackground().updateTransform();



// Listen for animate update

app.ticker.add((delta) => {

    //k++;
    //if (k % 20 == 0) {
    text.text = 'ID: ' + player_element.pos + ' x:' + player_element.x + ' y:' + player_element.y;
    //}

    // rotate the container!
    // use delta to create frame-independent transform
    //player_sprite.rotation -= 0.01 * delta;
});



function move(option) {

    let x = player_element.x;
    let y = player_element.y;
    let cx = x;
    let cy = y;

    let directionMap = { 'up': 3, "down": 0, "left": 1, "right": 2 };
    switch (option) {
        case "up":
            cy -= 1;
            break;
        case "down":
            cy += 1;
            break;
        case "left":
            cx -= 1;
            break;
        case "right":
            cx += 1;
            break;
    }
    player_element.direction = directionMap[option];

    player_element.pos++;
    let textures = People.Gakusei[player_element.char][player_element.direction];
    if (player_element.pos >= textures.length) {
        player_element.pos = 0;
    }
    player_sprite.texture = textures[player_element.pos];

    //check move allow
    let {
        moveup = true, movedown = true,
        moveleft = true, moveright = true
    } = tilemap.getTileData(x, y);
    const move = { 'up': moveup, "down": movedown, "left": moveleft, "right": moveright };
    if (!move[option]) {
        return;
    }

    //check nex tile move allow
    let { walkover = false } = tilemap.getTileData(cx, cy);
    if (walkover) {
        x = cx;
        y = cy;
    }

    if (x != player_element.x || y != player_element.y) {
        tilemap.moveTo(x, y);
        player_element.x = x;
        player_element.y = y;

        player_sprite.x = tile_w * (x);
        player_sprite.y = tile_h * (y);

        tilemap.getBackground().updateTransform();
        //app.stage.updateTransform();
    }
}
app.stage.sortableChildren = true;
