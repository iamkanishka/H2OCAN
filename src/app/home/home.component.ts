import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

interface orders{
  totord: number;
  avlblcans: number;
  delord: number;
  undelord: number;
  }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    
  ordersdetails : AngularFirestoreDocument<orders>;
  ordersobs: Observable<orders>;
   
showchip:boolean=true;
showform:boolean=false;

quantp:string;
quant250:string="250ml";
quant500:string="500ml";
quant1ltr:string="1ltr";
quant2ltr:string="2ltr";
quant25ltr:string="25ltr";



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private afs:AngularFirestore) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ordersdetails=this.afs.doc<orders>('ordersdet/ordersdetails');
   this.ordersobs=this.ordersdetails.valueChanges();
  }
 
displayform(quant:string){
this.showchip=false;
this.showform=true;
this.quantp=quant;
}

displayc(qun:number,){
this.showchip=true;
this.showform=false;

switch (this.quantp){
  case "250ml": {this.quant250=`${this.quantp}(${qun})`;
        break;}
  case "500ml" :{this.quant500=`${this.quantp}(${qun})`;
          break;}

  case "1ltr" :{this.quant1ltr=`${this.quantp}(${qun})`;
  break;}
  case "2ltr" :{this.quant2ltr=`${this.quantp}(${qun})`;
    break;}
  case "25ltr" :{this.quant25ltr=`${this.quantp}(${qun})`;
  break;}

}

}

clearme(){
  this.quant250="250ml";
  this.quant500="500ml";
  this.quant1ltr="1ltr";
  this.quant2ltr="2ltr";
  this.quant25ltr="25lr";
}

}
