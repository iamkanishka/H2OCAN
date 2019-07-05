import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';

interface orders{
  totord:number;
  avlblcans:number;
  delord:number;
  undelord:number;
  
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
quant:number=20;

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
 
displayf(quant:string){
this.showchip=false;
this.showform=true;
}

}
