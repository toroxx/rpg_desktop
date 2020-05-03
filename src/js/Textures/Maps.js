import BG from './Background';
const { app: ele_app, BrowserWindow, screen } = electron.remote;

const rootpath = ele_app.getAppPath();
const maps_folder = path.join(rootpath, '/resources/Maps');


let Maps = {
    load: () => {

        let maps = {};
        const files = fs.readdirSync(maps_folder);
        for (let m in files) {
            let file = files[m];
            if (file.indexOf('.json') > -1) {
                let mapdata = require('../../../resources/Maps/' + file);
                const { map, item, mapTileOption } = mapdata;


                let wCount = map[0].length;
                let hCount = map.length;
                mapdata['wCount'] = wCount;
                mapdata['hCount'] = hCount;
                mapdata['count'] = wCount * hCount;
                mapdata['item'] = Maps.getItems(item);
                mapdata['infoTiles'] = Maps.getInfoTiles(map, mapTileOption, wCount);

                maps[file.replace(/.json/g, '')] = mapdata;
            }
        }

        return maps;
    },

    getItems: (items) => {
        for (let i in items) {
            if (i == '-void-') {
                continue;
            }

            let layers = items[i]['layers'];
            for (let k in layers) {
                let { bg, id, ...others } = layers[k];
                layers[k]['texture'] = BG[bg]['textures'][id] || null;
            }

        }
        return items;
    },

    getInfoTiles: (map, mapTileOption, wCount) => {
        let info_tiles = {};
        map.map((row, y) => {
            row.map((col, x) => {
                let i = x + y * wCount;


                const tile_info = map[y][x];
                let tileData = { TileID: tile_info }
                if (typeof (tile_info) == 'object') {
                    tileData = { ...tile_info };
                }
                map[y][x] = tileData;

                let { TileID = null, InfoID = null } = tileData;

                if (TileID != null && InfoID != null) {
                    if (info_tiles[InfoID] == void (0)) {
                        info_tiles[InfoID] = { 'params': mapTileOption[InfoID], 'tiles': [] };
                    }
                    info_tiles[InfoID]['tiles'].push([TileID, i, x, y]);
                }
            });
        });
        return info_tiles;
    }



}

const maps = Maps.load();
export default { ...maps };