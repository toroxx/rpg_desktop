import * as Components from '../Components';
import * as Util from '../Util';
import * as Data from '../Data';



class Main extends Components.Stage {
    constructor(app, tile_size, min_level, max_level) {
        super(app, tile_size, min_level, max_level);
        this.app = app;

        this.npcs_mapping = Data.LCKMain.npcs;
        this.events_mapping = Data.LCKMain.events;

        this.width = app.INIT_WIDTH;
        this.height = app.INIT_HEIGHT;

        //message box
        this.messagebox = new Components.MessageBox(app, this, 800, 100, 50);
        this.addChild(this.messagebox);

        //map container
        const map_container = new PIXI.Container();
        let [adj_x, adj_y] = Util.getCenterXY(this, map_container);
        map_container.width = app.INIT_WIDTH;
        map_container.height = app.INIT_HEIGHT;
        map_container.x = adj_x;
        map_container.y = adj_y;
        this.map_container = map_container;
        this.addChild(map_container);

        //tile map
        this.tileMap = this.setupTileMap(this.onTileCallback.bind(this));
        map_container.addChild(this.tileMap);

        //player
        this.player = this.add_character('Akunin3', 'p3', 'down', 18);
        this.tileMap.addChild(this.player);

        //npc 
        this.npcs = {};

        //init
        this.messagebox.showText(Data.LCKMain._('GAME_TITLE'), 'center');
        this.tileMap.goToMapEntryPoint("LCKOffice", 'exit2', (x, y) => {
            this.loadNPCS();
            this.player.moveTo(x, y);
        });


        {
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

    }

    onTileButtonDown(e) {
        let { tile, x, y } = e.detail
        console.log(x, y);
    }

    onTileCallback(action, tile, tileMap) {
        switch (action) {
            case 'TileButtonDown':
                console.log("TileButtonDown", tile.tile_x, tile.tile_y);
                break;
            case 'TileButtonOver':
                if (!this.messagebox.isShow) {
                    tile.setHighlight(true)
                }

                break;
            case 'TileButtonOut':
                tile.setHighlight(false)
                break;
        }



    }


    keydownHandler(e) {
        let keyMap = { 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right', 'ArrowUp': 'up', }
        if (keyMap[e.key] && this.player.moveable) {
            this.messagebox.hidden();

            this.player.move(this.tileMap, keyMap[e.key], true, (map_name, InfoID, direction, entrypoint, x, y) => {
                //console.log(map_name, InfoID, direction, entrypoint, x, y);
                const token = `${InfoID}-${direction}`;
                console.log('Token:', token);

                let event = this.get_event(map_name, token)
                if (event) {
                    this.player.moveable = false;
                    event(this);
                    this.player.moveable = true;
                    return false;
                }
            });
        }
    }
}

export default Main;