import * as Asset from './Asset';
import * as Window from './Window';
import * as Lang from './Lang';
export {
    Asset,
    Window,
    Lang
};


export function getBound(target) {
    return { x: target.x, y: target.y, width: target.width, height: target.height };
}

export function getCenterXY(target1, target2) {
    if (target1.width == 0 || target2.width == 0 || target1.height == 0 || target2.height == 0) {
        return [0, 0];
    }
    return [
        (target1.width - target2.width) / 2,
        (target1.height - target2.height) / 2
    ];
}

export function screenResizeHandler(stage) {
    let { app } = stage;
    let WIDTH = app.INIT_WIDTH;
    let HEIGHT = app.INIT_HEIGHT;

    let ratio = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    //console.log('screen', window.innerWidth, window.innerHeight, WIDTH, HEIGHT, ratio);

    /*
    console.log('screenResizeHandler', WIDTH, HEIGHT, ratio);
    console.log(' app.renderer', app.renderer.width, app.renderer.height);
    console.log(' app.screen', app.screen.width, app.screen.height);
    */
    stage.scale.x = stage.scale.y = ratio;
    app.renderer.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
    stage.ratio = ratio;

    stage.screenResizeHandler();
}