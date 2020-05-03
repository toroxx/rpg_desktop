import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
require("pixi-layers")
function getDirectionID(direction) {
    let directionMap = { 'up': 3, "down": 0, "left": 1, "right": 2 };
    return directionMap[direction];
}


import * as People from '../Textures/People';
class Character extends PIXI.Sprite {
    constructor(tile_size, character_set, id, direction) {
        let direction_id = getDirectionID(direction);
        let textures = People[character_set][id];

        super(textures[direction_id][1]);
        this.curr_x = 0;
        this.curr_y = 0;

        this.textures = textures;
        this.tile_size = tile_size;
        this.direction = direction;
        this.pos = 1;

        this.moveable = true;


        //this.moveTo(curr_x, curr_y);

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0xFF0000, 1);
        graphics.drawRect(0, 0, this.width, this.height);
        //this.addChild(graphics);
    }


    moveTo(x, y, speed = 0) {
        //console.log('character.moveto', x, y, this.x, this.y);
        this.curr_x = x;
        this.curr_y = y;
        if (speed == 0) {
            this.x = this.tile_size * x;
            this.y = this.tile_size * y;
            return;
        }

        const coords = { x: this.curr_x, y: this.curr_y }
        let tween = new TWEEN.Tween(coords)
            .to({ x, y }, 100)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.x = this.tile_size * (coords.x);
                this.y = this.tile_size * (coords.y);
            })
            .start();
        //this.updatePos(direction);
    }

    updatePos(direction, pos = 1) {
        if (this.direction != direction) {
            this.changePos(direction, pos);
            return;
        }
        this.nextPos();
    }

    changePos(direction, pos = 1) {
        let direction_id = getDirectionID(direction);
        this.direction = direction;
        this.pos = pos;

        //console.log(this.textures, this.direction, this.pos);
        this.texture = this.textures[direction_id][this.pos];
    }

    nextPos() {
        let direction_id = getDirectionID(this.direction);
        this.pos++;
        let textures = this.textures[direction_id];
        if (this.pos >= textures.length) {
            this.pos = 0;
        }
        this.texture = textures[this.pos];
    }

    async walk(tileMap, paths, step_delay, loop = 0, move_screen = false) {
        const step = (direction) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.move(tileMap, direction, move_screen);
                    resolve();
                }, step_delay)
            });
        }

        let ploop = 0;
        do {
            for (const p of paths) {
                await step(p);
            }
            ploop++;
        } while (ploop < loop);

    }
    getCurrPosition() {
        return { x: this.curr_x, y: this.curr_y };
    }


    move(tilemap, direction, move_screen = true, event_callback = null) {
        let x = this.curr_x;
        let y = this.curr_y;
        let cx = x;
        let cy = y;

        switch (direction) {
            case "up": cy += -1; break;
            case "down": cy += 1; break;
            case "left": cx += -1; break;
            case "right": cx += 1; break;
        }

        this.updatePos(direction, 1);

        //check move allow
        let { opts, info, InfoID } = tilemap.getTile(x, y);
        //console.log(opts, option);
        const {
            moveup = 1, movedown = 1, moveleft = 1, moveright = 1,
            eventup = 0, eventdown = 0, eventleft = 0, eventright = 0
        } = opts;

        const move = { 'up': moveup, "down": movedown, "left": moveleft, "right": moveright };
        const event = { 'up': eventup, "down": eventdown, "left": eventleft, "right": eventright };

        if (event[direction] === 1) {
            //console.log('event', direction, InfoID, x, y);
            if (typeof event_callback == "function") {

                let walkover = event_callback(tilemap.map_name, InfoID || `${x}-${y}`, direction, (info.params && info.params.entrypoint) || false, x, y);
                if (walkover === false) {
                    return;
                }
            }

        }

        if (!move[direction]) {
            //console.log('non move', direction, x, y);
            return;
        }

        //check next tile move allow
        let { opts: nextTile_opts } = tilemap.getTile(cx, cy);
        let walkover = nextTile_opts['walkover'] || false;
        if (walkover) {
            x = cx;
            y = cy;
        }

        if (x != this.curr_x || y != this.curr_y) {

            if (move_screen) {
                tilemap.moveTo(x, y, 0);
            }
            this.moveTo(x, y, 0)
            tilemap.updateTransform();
        }
    }
}
export default Character;