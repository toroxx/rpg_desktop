import React, { useState, useEffect } from "react";
import * as Util from "../Util";
const { getCurrentWindow } = electron.remote;

import IconButton from '../Components/IconButton';

const MainView = (props) => {
    const db = props.db;
    const [changes, setChanges] = useState(0);
    const [apps, setApps] = useState([]);


    useEffect(() => {
        db.loadDatabase();
        db.find({}, function (err, docs) {
            setApps((err == null) ? docs : []);
        });
    },[changes]);

    window.reload_list = () => {
        let val = changes + 1;
        setChanges(val);
    }

    return (
        <div className="window" >
            <header>
                <div id="title">Toolbox</div>
                <div id="title-bar-btns">
                    <button className="btn" onClick={() => { getCurrentWindow().openDevTools() }}>?</button>

                    <button className="btn" id="add-btn" onClick={() => {
                        const pos = Util.center_screen_pos(400, 200);

                        const win = Util.open_win(400, 150, pos, 'edit.html')
                        win.on('closed', function () {
                            window.reload_list();
                        });
                    }}>+</button>
                    <button className="btn" id="close-btn" onClick={() => { window.close() }}>x</button>
                </div>
            </header>

            <main>
                {apps.map(app => (
                    <IconButton db={db} {...app} />
                ))}
            </main>
        </div>
    );


}



export default MainView;