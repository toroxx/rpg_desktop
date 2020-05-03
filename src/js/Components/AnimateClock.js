let ani_clock = {};
let ani_txtclock = {};//counter value

export default function AnimateClock(app, mapdata, tiledata, mapTileOption, offset, ani_callback) {

    this.destroy = () => {
        console.log('Old Clocks clear');
        for (let k in ani_clock) {
            try {
                app.ticker.remove(ani_clock[k]);
            } catch (e) { }
        }
        ani_clock = {};
        ani_txtclock = {};
    };

    this.init = () => {
        let autoani_info_ids = {};
        for (let k in mapTileOption) {
            let { autostart_ani = false, framePerLoop = 10 } = mapTileOption[k];
            if (autostart_ani) {
                autoani_info_ids[k] = framePerLoop * offset;
            }
        }

        let antoani_tile_ids = [];
        let antoani_tiles = {};
        for (let y in mapdata) {
            for (let x in mapdata[y]) {
                let { InfoID, TileID } = mapdata[y][x];


                if (autoani_info_ids[InfoID]) {
                    let framePerLoop = autoani_info_ids[InfoID];
                    antoani_tiles[TileID] = InfoID;
                    antoani_tile_ids.push([InfoID, TileID, framePerLoop, y, x]);
                }
            }
        }

        let tile_ani_layer = {};
        for (let v in tiledata) {
            if (antoani_tiles[v] == void (0)) {
                continue;
            }
            let { layers } = tiledata[v];

            let anilayers = {};
            for (let layer_index in layers) {
                let { name = "", ani = "" } = layers[layer_index];
                if (name == "" || ani == "") {
                    continue;
                }
                ani = parseFloat(ani);
                anilayers[ani] = layers[layer_index];
            }

            if (Object.keys(anilayers).length > 1) {
                const ordered = {};
                Object.keys(anilayers).sort((a, b) => a.ani - b.ani).forEach(function (key) {
                    ordered[key] = anilayers[key];
                });
                tile_ani_layer[v] = { layers: ordered, };
            }
        }

        for (let v in antoani_tile_ids) {
            let [InfoID, TileID, framePerLoop, y, x] = antoani_tile_ids[v];
            console.log('Clock:', InfoID, TileID, framePerLoop, y, x, 'start');

            const clock_key = `${InfoID}, ${TileID}, ${framePerLoop}, ${y}, ${x}`;
            if (ani_txtclock[clock_key] == void (0)) {
                ani_txtclock[clock_key] = 0;
            }

            ani_clock[clock_key] = (delta) => {

                ani_callback(tile_ani_layer[TileID], InfoID, TileID, framePerLoop, y, x, ani_txtclock[clock_key] + 1);
               // console.log('.tileinfo.' + InfoID + ' span.frame', ani_txtclock[clock_key] + 1);

                ani_txtclock[clock_key] = (ani_txtclock[clock_key] + 1) % framePerLoop;
            };

            app.ticker.add(ani_clock[clock_key]);
        }
        console.log("ani_clock: ", ani_clock);
    }

    this.init();
}

