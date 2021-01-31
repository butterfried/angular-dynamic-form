import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
})
export class EditInputComponent implements OnInit {
  @Input() data: string;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();
  editMode = false;
  constructor() {
      this.data = '';
  }

  ngOnInit() {}

  onEdit($event:any) {
    this.editMode=true;
    $event.stopPropagation();
  }

  onFocusOut() {
    this.editMode = false;
    this.focusOut.emit(this.data);
  }

  onEnter($event:any) {
    $event.target.blur();
  }

  onInputClick($event:any) {
    $event.stopPropagation();
  }
}
