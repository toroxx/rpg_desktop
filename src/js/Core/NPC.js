

class NPC {
    constructor(elem, name, message = []) {
        this.elem = elem;
        this.name = name;
        this.messages = messages;
    }

    ask() {
        const idx = Math.floor(Math.random() * this.messages.length);
        return this.messages[idx];
    }

}


export default NPC;