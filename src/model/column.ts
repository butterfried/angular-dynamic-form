import { NgForm } from "@angular/forms";
import { Item } from "./item";

export class Column {
    depth: number;
    item: Item;
    isLoading: boolean;
    
    constructor(depth: number, item: Item) {
        this.depth = depth;
        this.item = item;
        this.isLoading = false;
    }  
}