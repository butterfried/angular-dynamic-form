import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Column } from 'src/model/column';
import { Item } from 'src/model/item';
import { ItemService } from 'src/services/item.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDepth = 0;
  columns: Column[];
  items: Item[];

  constructor( private itemService: ItemService ) {
    this.columns = [];
    this.items = [];
    let mainColumn = new Column(this.currentDepth, new Item().setMessage('Main'));
    this.addColumn(mainColumn);
    // Called first time before the ngOnInit()
  }

  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges() 
  }

  onItemClick(thisDepth: number, item: Item) {
    if ( this.columns[thisDepth + 1] && this.columns[thisDepth + 1].item.sid == item.sid ) {
      console.log('same');
      return;
    }
    // remove column
    this.columns = this.columns.slice(0, thisDepth + 1);

    this.currentDepth = thisDepth + 1;
    
    let newColumn = new Column(this.currentDepth, item);

    this.addColumn(newColumn)
  }
  
  addColumn(column:Column) {
    this.columns.push(column);
    this.loadChildOfColumn(column)
  }

  addItemToColumn(column:Column, form: NgForm) {
    column.isLoading = true;
    let parentId = column.item.id != 0 ? column.item.id : null;
    let newItem = (new Item()).setMessage(form.value.message);
    this.itemService.createItem(parentId, newItem).subscribe(
      response => {
        newItem.setId(response.data.id);
        column.item.childs.push(newItem);
        column.isLoading = false;
      },
      error => {
        console.log(error);
        column.isLoading = false;
      });
  }

  updateItem(item:Item, form: NgForm) {
    this.itemService.updateItem(item).subscribe(
      response => {
      },
      error => {
        console.log(error);
      });
  }

  deleteItem($event:any, column:Column, item:Item) {
    column.isLoading = true;
    let deletingItemSid = item.sid;
    this.itemService.deleteItem(item.id).subscribe(
      response => {
        // delete item from column
        column.item.childs = column.item.childs.filter((item) => {
          return item.sid != deletingItemSid;
        })
        // remove opened column
        let deletedColumnIndex = this.columns.findIndex( column => column.item.sid == deletingItemSid);
        this.columns = this.columns.slice(0, deletedColumnIndex);
        column.isLoading = false;
      },
      error => {
        console.log(error);
        column.isLoading = false;
      });

      $event.stopPropagation();
  }

  loadChildOfColumn(column:Column) {
    column.isLoading = true;
    let id = column.item.id != 0 ? column.item.id : null;
    this.itemService.getItems(id).subscribe(
      response => {
        column.item.childs = [];
        response.data.forEach((responseData) => {
          column.item.childs.push(
            (
              new Item()).setMessage(responseData.message)
              .setId(responseData.id)
              .setChildNodesCount(responseData.childNodesCount)
            );
        });
        column.isLoading = false;
      },
      error => {
        console.log(error);
        column.isLoading = false;
      });
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
