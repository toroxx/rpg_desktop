
let power = {};
for (let i = 1; i <= 100; i++) {
    power[i] = {};
    power[i]['required_exp'] = calRequiredExp(i);
    power[i]['hp'] = calHP(i);
    power[i]['mp'] = calMP(i);
}

function calRequiredExp(lv) {
    let baseExp = 100;
    let requireExp = 0;
    for (let i = 1; i <= lv; i++) {
        requireExp += baseExp * (i - 1);
    }
    return requireExp;
}

function calHP(lv) {
    let base = 10;
    let requireExp = base;
    for (let i = 1; i <= lv; i++) {
        requireExp += Math.ceil((i - 1) / 33);
    }
    return requireExp;
}

function calMP(lv) {
    let base = 10;
    let requireExp = base;
    for (let i = 1; i <= lv; i++) {
        requireExp += Math.round((i - 1) / 50);
    }
    return requireExp;
}

class Player {
    constructor(elem, name, lv) {
        this.elem = elem;
        this.name = name;
        this.lv = lv;

        let p = power[lv];
        this.hp = p['hp'];
        this.mp = p['mp'];
        this.exp = p['required_exp'];
    }

    getElem() {
        return this.elem;
    }

    getLvInfo(lv) {
        return power[lv];
    }
    getMP() {
        return this.mp;
    }
    getHP() {
        return this.hp;
    }
    getExp() {
        return this.exp;
    }

    nextExp() {
        let lv = this.getLevel();
        if (lv == power.length) {
            return 0;
        }
        return power[lv]['required_exp'] - this.exp;
    }

    getLevel() {
        if (this.lv == power.length) {
            return power.length
        }

        for (let i = 1; i < power.length; i++) {
            if (this.exp < power[i]['required_exp']) {
                return i - 1;
            }
        }
        return power.length;
    }

    addExp(exp) {
        if (exp <= 0) {
            return;
        }
        let prev_lv = this.lv;
        if (this.lv < power.length) {
            this.exp += exp;
        }
        let curr_lv = getLevel();
        if (curr_lv == prev_lv) {
            return 0;
        }
        let prev_info = this.getLvInfo(prev_lv);
        let curr_info = this.getLvInfo(curr_lv);
        return [1, curr_info['hp'] - prev_info['hp'], curr_info['mp'] - prev_info['mp']];
    }

    addHP(val) {
        const mhp = power[this.lv]['hp'];
        let changes = this.hp + val;

        if (changes <= 0) {
            changes = 0;
        }
        if (changes >= mhp) {
            changes = mhp;
        }
        this.hp = changes;
    }

    addMP(val) {
        const mmp = power[this.lv]['mp'];
        let changes = this.mp + val;

        if (changes <= 0) {
            changes = 0;
        }
        if (changes >= mmp) {
            changes = mmp;
        }
        this.mp = changes;
    }

}


export default Player;