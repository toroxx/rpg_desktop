import * as Components from '../Components';
import * as Util from '../Util';
class Main extends Components.Stage {
    constructor(app, tile_size, min_level, max_level) {
        super(app, tile_size, min_level, max_level);
        this.app = app;

        let WIDTH = app.screen.width;
        let HEIGHT = app.screen.height;
        this.width = WIDTH;
        this.height = HEIGHT;

        //message box
        const messagebox = new Components.MessageBox(app, this, 800, 100,50);
        this.messagebox = messagebox;
        this.addChild(messagebox);
        messagebox.showText('testing', 'center');

        //map container
        const map_container = new PIXI.Container();
        map_container.width = WIDTH;
        map_container.height = HEIGHT;

        
        this.addChild(map_container);

        //tile map
        const tileMap = new Components.TileMap(app, this, tile_size);
        this.tileMap = tileMap;
        map_container.addChild(tileMap);
        tileMap.x = 0;
        tileMap.y = 0;

        //player
        let player = new Components.Character(tile_size, 'Gakusei', 'p2', 'down');
        tileMap.addChild(player);
        player.scale.x = 1.25;
        player.scale.y = 1.3;
        player.anchor.set(0.1, 0.3);
        player.parentLayer = this.getDisplayLevel(15);
        this.player = player;


        tileMap.goToMapEntryPoint("Street01", 'test3', player);



        console.log('stage', this.x, this.y, this.width, this.height, this.app.screen.width, this.app.screen.height);
        console.log('tileMap', tileMap.x, tileMap.y, tileMap.width, tileMap.height);
        console.log('tilex', tileMap.getTileCenter(), tileMap.getTileCount(), tileMap.getMapSize(), this.getTileMaxBound());

        /*
setTimeout(async () => {
    var paths = ['down', 'down', 'right', 'right', 'right',
'up', 'up', 'right', 'right',];

    player.moveable = false;
    await player.walk(tileMap, paths, 100);
    var xp = [
        'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left',
        'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right'
    ];
    await player.walk(tileMap, xp, 150, 1, false);

    player.moveable = true;
}, 2000)
*/


    }


    keydownHandler(e) {
        let events_mapping = {
            "MStoreRoom": {
                "exit1-right": () => { this.tileMap.goToMapEntryPoint("MOffice", 'exit2', this.player); },
            },
            "MCorridor": {
                "exit1-left": () => { this.tileMap.goToMapEntryPoint("MOffice", 'exit1', this.player); },
                "exit4-right": () => { this.tileMap.goToMapEntryPoint("Street01", 'test2', this.player); },
            },
            "Street01": {
                "test1-down": () => { this.tileMap.goToMapEntryPoint("MStoreRoom", 'store1', this.player); },
                "test2-down": () => { this.tileMap.goToMapEntryPoint("MCorridor", 'exit4', this.player); },
            },

            "MOffice": {
                "exit1-right": () => { this.tileMap.goToMapEntryPoint("MCorridor", 'exit1', this.player); },
                "exit2-left": () => { this.tileMap.goToMapEntryPoint("MStoreRoom", 'exit1', this.player); },
                "4-6-up": () => { this.messagebox.showText(Util.Lang._('COMPUTER_PC_MSG3')[0]) },
                "9-6-up": () => { this.messagebox.showText(Util.Lang._('COMPUTER_PC_MSG')[0]) },
                "pc3_chair-up": () => { this.messagebox.showText(Util.Lang._('COMPUTER_SELF_PC_MSG')[0]) },
                "12-11-up": () => { this.messagebox.showText(Util.Lang._('COMPUTER_PC_MSG')[0]) },
            }
        }


        let keyMap = { 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right', 'ArrowUp': 'up', }
        if (keyMap[e.key] && this.player.moveable) {
            this.messagebox.hidden();

            this.player.move(this.tileMap, keyMap[e.key], true, (map_name, InfoID, direction, entrypoint, x, y) => {
                console.log(map_name, InfoID, direction, entrypoint, x, y);

                const token = `${InfoID}-${direction}`;

                console.log('Token:', token);

                if (events_mapping[map_name]) {
                    let event = events_mapping[map_name][token];
                    if (event) {
                        this.player.moveable = false;
                        event();
                        this.player.moveable = true;
                        return false;
                    }
                }
            });
        }

    }
}

export default Main;