export function rect(x, y, w, h, color, alpha) {
    const g = new PIXI.Graphics();
    g.beginFill(color, alpha);
    g.drawRect(0, 0, w, h);
    g.endFill();
    g.x = x;
    g.y = y;
    return g;
}