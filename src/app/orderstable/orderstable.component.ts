import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-orderstable',
  templateUrl: './orderstable.component.html',
  styleUrls: ['./orderstable.component.scss']
})
export class OrderstableComponent implements OnInit {
  displayedColumns = ['select','position', 'name', 'weight', 'symbol'];
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'delivered'},
  {position: 2, name: 'github', weight: 4.0026, symbol: 'Ondelivery'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'delivered'},
  {position: 4, name: 'github', weight: 9.0122, symbol: 'Ondelivery'},
  {position: 5, name: 'github', weight: 10.811, symbol: 'Ordered'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'Ondelivery'},
  {position: 7, name: 'github', weight: 14.0067, symbol: 'Undelivered'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'Ordered'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'delivered'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'delivered'},
];