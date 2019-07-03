import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

     date:string;
  
  constructor() { }

  ngOnInit() {
  this.date="31/07/1997";
  }

}
