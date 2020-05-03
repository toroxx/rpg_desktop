const pjson = require('../package.json');
const path = require('path');
const url = require('url');
const fs = require('fs');
const sizeOf = require('image-size');
const TWEEN = require('@tweenjs/tween.js');

const querystring = require('querystring');
const electron = require('electron');
const { remote } = electron;
const { Menu, MenuItem } = remote;

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//load db
const dbpath = path.join(__dirname, '/resources/db/', 'db.json');
const db = load_datastore({ filename: dbpath, autoload: true });
db.loadDatabase();

//load dialogs
const Dialogs = require('dialogs')
const dialogs = Dialogs()

function exec(path, callback) {
    const exec = require('child_process').exec;
    exec(path, callback);
}

function load_datastore(options) {
    const Datastore = require('nedb');
    return new Datastore(options);
}

window.env = process.env;

