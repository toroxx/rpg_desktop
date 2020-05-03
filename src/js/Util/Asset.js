

const { app: ele_app, BrowserWindow, screen } = electron.remote;

const rootpath = ele_app.getAppPath();
const assets_path = path.join(rootpath, '/assets/');


export function load_resources(folder) {
    const files = fs.readdirSync(path.join(assets_path, '/' + folder + '/'));
    let resources = {};

    for (let filename of files) {
        let [name = "", size, ext] = filename.split(/[@.]+/);
        let [row_per_tile = 0, tile_size = 0] = size.split('x');

        row_per_tile = parseInt(row_per_tile);
        tile_size = parseInt(tile_size);

        if (filename != '' && row_per_tile > 0 && tile_size > 0) {
            const img_path = path.join(assets_path, '/' + folder + '/', filename);
            let { width, height } = sizeOf(img_path);

            resources[name] = {
                "path": img_path, filename, row_per_tile, tile_size, width, height,
                wCount: Math.ceil(width / tile_size),
                hCount: Math.ceil(height / tile_size),
                getXYByID: (id) => {
                    const row = Math.floor(id / row_per_tile);
                    const col = (id % row_per_tile);
                    return { y: row, x: col };
                },
                getScale: (tile_display_size) => {
                    return tile_display_size / tile_size;
                }
            }

        }
    }

    window.resources = resources;
    return resources;
}
