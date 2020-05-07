import * as Util from '../Util';
const LangSet = {
    "default": {
        "GAME_TITLE": 'Game',
        "COMPUTER_SELF_PC_MSG": ["這是我的電腦", "平常工作的電腦"],
        "COMPUTER_PC_MSG": ["全都是看不懂的文字"],
        "COMPUTER_PC_MSG2": ["開了很多色情網站"],
        "COMPUTER_PC_MSG3": ["耳邊突然傳來一聲: 你真是一個專家~~~\n(汗 ~~~~)"]
    }
}
let _ = function (text, params = [], lang = 'default') {
    return Util.Lang._(LangSet, text, params, lang);
}

let npcs = {
    "MOffice": {
        "NPC1": { "pos": [9, 3], character: ["Akunin3", 'p1', 'down'], opts: { walkover: false } },
        "NPC2": { "pos": [4, 3], character: ["Akunin3", 'p2', 'down'], opts: { walkover: false } },
        "NPC3": { "pos": [12, 3], character: ["Akunin3", 'p3', 'down'], opts: { walkover: false } },
    },
    "Street01": {
        "NPC1": { "pos": [6, 3], zIndex: 15, character: ["Akunin3", 'p1', 'down'], opts: { walkover: false } },
        "NPC2": { "pos": [7, 3], zIndex: 15, character: ["Akunin3", 'p2', 'down'], opts: { walkover: false } },
        "NPC3": { "pos": [8, 3], zIndex: 15, character: ["Akunin3", 'p3', 'down'], opts: { walkover: false } },
        "NPC4": { "pos": [9, 3], zIndex: 15, character: ["Akunin3", 'p4', 'down'], opts: { walkover: false } },
        "NPC5": { "pos": [10, 3], zIndex: 15, character: ["Akunin3", 'p5', 'down'], opts: { walkover: false } },
        "NPC6": { "pos": [11, 3], zIndex: 15, character: ["Akunin3", 'p6', 'down'], opts: { walkover: false } },
        "NPC7": { "pos": [12, 3], zIndex: 15, character: ["Akunin3", 'p7', 'down'], opts: { walkover: false } },
        "NPC8": { "pos": [13, 3], zIndex: 15, character: ["Akunin3", 'p8', 'down'], opts: { walkover: false } },

        "NPC11": { "pos": [6, 4], zIndex: 16, character: ["Akunin1", 'p1', 'down'], opts: { walkover: false } },
        "NPC12": { "pos": [7, 4], zIndex: 16, character: ["Akunin1", 'p2', 'down'], opts: { walkover: false } },
        "NPC13": { "pos": [8, 4], zIndex: 16, character: ["Akunin1", 'p3', 'down'], opts: { walkover: false } },
        "NPC14": { "pos": [9, 4], zIndex: 16, character: ["Akunin1", 'p4', 'down'], opts: { walkover: false } },
        "NPC15": { "pos": [10, 4], zIndex: 16, character: ["Akunin1", 'p5', 'down'], opts: { walkover: false } },
        "NPC16": { "pos": [11, 4], zIndex: 16, character: ["Akunin1", 'p6', 'down'], opts: { walkover: false } },
        "NPC17": { "pos": [12, 4], zIndex: 16, character: ["Akunin1", 'p7', 'down'], opts: { walkover: false } },
        "NPC18": { "pos": [13, 4], zIndex: 16, character: ["Akunin1", 'p8', 'down'], opts: { walkover: false } },
    }
};

let events = {
    "MStoreRoom": {
        "exit1-right": (stage) => { stage.loadMap("MOffice", 'exit2') },
    },
    "MCorridor": {
        "exit1-left": (stage) => { stage.loadMap("MOffice", 'exit1') },
        "exit4-right": (stage) => { stage.loadMap("Street01", 'test2') },
    },
    "Street01": {
        "test1-down": (stage) => { stage.loadMap("MStoreRoom", 'store1') },
        "test2-down": (stage) => { stage.loadMap("MCorridor", 'exit4') },
    },

    "MOffice": {
        "exit1-right": (stage) => { stage.loadMap("MCorridor", 'exit1') },
        "exit2-left": (stage) => { stage.loadMap("MStoreRoom", 'exit1') },
        "4-6-up": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG3')[0]) },
        "9-6-up": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG')[0]) },
        "pc3_chair-up": (stage) => { stage.messagebox.showText(_('COMPUTER_SELF_PC_MSG')[0]) },
        "12-11-up": (stage) => { stage.messagebox.showText(_('COMPUTER_PC_MSG')[0]) },
    }
}


export { _, events, npcs }