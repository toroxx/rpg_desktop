import * as PIXI from 'pixi.js';

class MessageBox extends PIXI.Container {
    constructor(app, stage, w, h, padding = 50) {
        super();
        this.isShow = false;
        this.app = app;
        this.stage = stage;

        let WIDTH = this.app.INIT_WIDTH;
        let HEIGHT = this.app.INIT_HEIGHT;

        let width = WIDTH;
        let height = HEIGHT;

        this.display_x = (width - w) / 2
        this.display_y = height - (h + padding);
        this.msg_seq = 0;
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xFFFFFF, 1);
        graphics.beginFill(0x999999, 0.8);
        graphics.drawRoundedRect(0, 0, w, h, 5);
        graphics.endFill();

        //
        this.addChild(graphics)


        const style = new PIXI.TextStyle({
            fontFamily: 'Noto Sans TC',
            fontSize: 24,
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,

            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,

            wordWrap: true,
            wordWrapWidth: w - 20,
        });

        const textarea = new PIXI.Text('', style);
        textarea.x = 10;
        textarea.y = 5;
        //textarea.width = w - 10;
        this.textarea = textarea;
        this.addChild(textarea)
    }
    showText(text, align = 'left') {
        this.isShow = true;
        this.msg_seq = 0;

        this.x = this.display_x;
        this.y = this.display_y;
        this.textarea.x = 10;
        this.textarea.y = 5;

        this.textarea.text = text;
        if (align == 'center') {
            this.textarea.x = (this.width - this.textarea.width) / 2
        }
        this.parentLayer = this.stage.getDisplayLevelMax();

    }

    hidden() {
        this.isShow = false;
        let WIDTH = this.app.INIT_WIDTH;
        let HEIGHT = this.app.INIT_HEIGHT;

        this.x = -10 * WIDTH;
        this.y = -10 * HEIGHT;
        this.parentLayer = this.stage.getDisplayLevelMin();
    }
}
export default MessageBox;