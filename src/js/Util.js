const { app, BrowserWindow, screen } = electron.remote;
const display = screen.getPrimaryDisplay();
const rootpath = app.getAppPath();

export function center_screen_pos(w, h) {
    const { width, height } = display.size;
    return { x: (width - w) / 2, y: (height - h) / 2 };
}


export function open_win(w, h, pos, page_path, params) {
    let { x = 0, y = 0 } = pos;
    console.log(w, h, pos);
    let win = new BrowserWindow({
        width: w, height: h,
        x: x, y: y,
        frame: false,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    console.log(page_path,params);
    var queryString = "";
    for (let key in params) {
        let val = params[key];
        queryString += (queryString.length > 0 ? "&" : "?");
        queryString += `${key}=${val}`;
    }
    console.log(queryString)
    win.loadURL(url.format({
        pathname: path.join(rootpath + '/app', page_path),
        protocol: 'file:',
        slashes: true
    }) + queryString);


    return win;
}
