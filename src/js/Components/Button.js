import * as PIXI from 'pixi.js';

class Button extends PIXI.Container {
    constructor(text, options) {
        super();

        const { x, y, w, h, r = 0 } = options;

        //const container = new PIXI.Container();
        //container.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.interactive = true; // 設定可以互動
        this.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xFFFFFF, 1);
        graphics.beginFill(0x999999);
        if (r == 0) {
            graphics.drawRect(0, 0, w, h);
        } else {
            graphics.drawRoundedRect(0, 0, w, h, r);
        }
        graphics.endFill();

        this.addChild(graphics);


        let button_text = new PIXI.Text(text,
            {
                padding: 5, fontFamily: 'Arial', fontSize: 18, fill: 0x000000, align: 'center'
            });

        //button_text.anchor.set(0.5);
        button_text.x = ((w - button_text.width) / 2);
        button_text.y = ((h - button_text.height) / 2);

        this.button_text = button_text;
        // = w;
        //button_text.height = h;
        this.addChild(button_text);

    }

    getButtonText() {
        this.button_text = button_text;
    }
}

export default Button;