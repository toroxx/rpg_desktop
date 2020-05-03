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