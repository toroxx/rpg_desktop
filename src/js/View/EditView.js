import React, { useState, useEffect } from "react";


const EditView = (props) => {
    const { db, searchParams } = props;

    const _id = searchParams.get('_id') || "";
    const [data, setData] = useState({ name: "", icon: "", "app_path": "", "_id": _id });

    let txt_name = React.createRef();
    let txt_icon = React.createRef();
    let txt_apppath = React.createRef();

    useEffect(() => {
        if (_id != "") {
            db.find({ '_id': _id }, function (err, docs) {
                if (err == null) {
                    setData(docs[0]);
                }
            });
        }
    }, []);


    return (
        <div className="window" >
            <header>
                <div id="title">{(_id == "") ? "Add" : "Edit"}</div>
                <div id="title-bar-btns">
                    <button className="btn" id="close-btn" onClick={() => { window.close() }}>X</button>
                </div>
            </header>
            <main>
                <table style={{ width: "100%" }}>
                    <tr>
                        <td style={{ width: "15%" }}>
                            Name:
                        </td>
                        <td>
                            <input style={{ width: "100%" }} ref={txt_name} type="text" name="name" defaultValue={data.name} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "15%" }}>
                            URL:
                    </td>
                        <td>
                            <input style={{ width: "100%" }} ref={txt_apppath} type="text" name="app_path" defaultValue={data.app_path} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "15%" }}>
                            ICON:
                        </td>
                        <td>
                            <input style={{ width: "100%" }} ref={txt_icon} type="text" name="icon" defaultValue={data.icon} />
                        </td>
                    </tr>
                </table>
                <button type="button" onClick={() => {
                    let txt_name_val = txt_name.current.value;
                    let txt_icon_val = txt_icon.current.value;
                    let txt_apppath_val = txt_apppath.current.value;
                    setData({ name: txt_name_val, icon: txt_icon_val, "app_path": txt_apppath_val, "_id": _id });


                    if (_id != "") {
                        db.update({ "_id": _id }, { name: txt_name_val, icon: txt_icon_val, "app_path": txt_apppath_val }, {}, function () {
                            window.close();
                        });
                    } else {
                        if (txt_name_val == "" || txt_icon_val == "" || txt_apppath_val == "") {
                            alert("Please enter the values");
                        } else {
                            db.insert({ name: txt_name_val, icon: txt_icon_val, "app_path": txt_apppath_val }, function () {
                                window.close();
                            });
                        }
                    }
                }}>Save</button>
                {" "}
                <button type="button" style={{ display: (_id == "" ? "none" : "") }}
                    onClick={() => {

                        db.remove({ "_id": _id }, {}, function () {
                            window.close();
                        });
                    }}
                >Del</button>
            </main>
        </div>
    );


}

export default EditView;