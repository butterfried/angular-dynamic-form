export class Item {
    sid: string;
    id: number;
    message: string;
    childs: Item[];
    childNodesCount: number;
  
    constructor() {
        this.id = 0;
        this.sid = Math.random().toString(36).substring(7);
        this.message = '';
        this.childs = [];
        this.childNodesCount = 0;
    }

    setId(id: number) {
        this.id = id;
        return this;
    }

    setMessage(message: string) {
        this.message = message;
        return this;
    }
  
    setChildNodesCount(count:number) {
        this.childNodesCount = count;
        return this;
    }

    getChildNodesCount() {
        return this.childs.length > 0 ? this.childs.length : this.childNodesCount;
    }
}