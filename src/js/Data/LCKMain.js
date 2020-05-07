import * as Util from '../Util';
const LangSet = {
    "default": {
        "GAME_TITLE": 'LCK Love Story',
        "COMPUTER_SELF_PC_MSG": ["我的工作間"],
        "COMPUTER_PC_MSG": ["全都是看不懂的文字"],
        "COMPUTER_PC_MSG2": ["開了很多色情網站"],
        "COMPUTER_PC_MSG3": ["濕了~~"]
    }
}
let _ = function (text, params = [], lang = 'default') {
    return Util.Lang._(LangSet, text, params, lang);
}

let npcs = {

    "LCKOffice": {
        "NPC1": { "pos": [3, 21], character: ["Akunin1", 'p6', 'up'], opts: { walkover: false } },
        "NPC2": { "pos": [24, 8], character: ["Akunin3", 'p4', 'down'], opts: { walkover: false } },
    }
};

let events = {
    "LCKOffice": {
        "exit2-down": (stage) => { stage.messagebox.showText(_('COMPUTER_SELF_PC_MSG')[0]) },
        "24-13-up": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG')[0]) },
        "exit1-down": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG2')[0]) },
        "3-21-up": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG3')[0]) },
    }
}


export { _, events, npcs }