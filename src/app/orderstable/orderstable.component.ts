import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material/table';
import {  Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';


export interface ordersitems {

  pay?: number;
  ordno?: number;
  name?: string;
  phone?: number;
  address?: string;
  landmark?: string;
  pincode?: number
}

@Component({
  selector: 'app-orderstable',
  templateUrl: './orderstable.component.html',
  styleUrls: ['./orderstable.component.scss']
})
export class OrderstableComponent implements OnInit {
  displayedColumns = ['select','ordno','name', 'phone', 'address', 'landmark','pincode','pay'];
  selection = new SelectionModel<ordersitems>(true, []);
  dataSource = new MatTableDataSource();

  private detailcollection:AngularFirestoreCollection<ordersitems>;
  details:Observable<ordersitems[]>;

  constructor( private afs :AngularFirestore) {
    this.detailcollection=afs.collection<ordersitems>('orderitems');
        this.details = this.detailcollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as ordersitems;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      }
  

 


  ngOnInit() {
    this.getalldetails();
  
  }


 getalldetails(){
 this.details.subscribe(res=>{this.dataSource.data=res});
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
  checkboxLabel(row?: ordersitems): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordno + 1}`;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

