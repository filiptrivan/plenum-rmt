import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'soft-panel',
  templateUrl: './soft-panel.component.html',
  styles: [
  ]
})
export class SoftPanelComponent implements OnInit {
  @Input() isFirstMultiplePanel: boolean = false;
  @Input() isMiddleMultiplePanel: boolean = false;
  @Input() isLastMultiplePanel: boolean = false;
  @Input() crudMenu: MenuItem[];
  @Input() showRemoveIcon: boolean = false;
  @Input() index: number;
  @Input() showPanelHeader: boolean = true;

  @Output() onMenuIconClick: EventEmitter<number> = new EventEmitter();
  @Output() onRemoveIconClick: EventEmitter<null> = new EventEmitter();

  @ViewChild('menu') menu: Menu;
  
  constructor() { }

  ngOnInit(): void {
  }

  menuItemClick(index: number, event){
    this.menu.toggle(event);
    this.onMenuIconClick.next(index);
  }

  removeItemClick(){
    this.onRemoveIconClick.next(null);
  }

}