import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


interface orderscount {
  totord: number;
  // avlblcans: number;
  // delord: number;
  // undelord: number;
}
interface ordersitems {
  pay: number;
  ordno: number;
  name: string;
  phone: number;
  address: string;
  landmark: string;
  pincode: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showchip: boolean = true;
  showform: boolean = false;
  showm: boolean = true;
  showmm: boolean = false;
  quantp: string;
  quant250: string = "250ml";
  quant500: string = "500ml";
  quant1ltr: string = "1ltr";
  quant2ltr: string = "2ltr";
  quant25ltr: string = "25ltr";
  q250: number;
  q500: number;
  q1: number;
  q2: number;
  q25: number;
  npform: FormGroup;
  addform: FormGroup;
  lpform: FormGroup;

  orderdet: any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  ordersdetails: AngularFirestoreDocument<orderscount>;
  ordersobs: Observable<orderscount>;
  private orderitemscollection: AngularFirestoreCollection<ordersitems>;
  orderitemobs: Observable<ordersitems[]>;
  constructor(private breakpointObserver: BreakpointObserver, public afs: AngularFirestore, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.ordersdetails = this.afs.doc<orderscount>('orderscounter/orderscount');
    this.ordersobs = this.ordersdetails.valueChanges();
    this.orderitemscollection = this.afs.collection<ordersitems>('orderitems');
    this.orderitemobs = this.orderitemscollection.valueChanges();

    this.npform = this.fb.group({
      
      name: ['', [
        Validators.required,
        Validators.maxLength(30),
      ]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]]
    });
    this.addform = this.fb.group({
      address: ['', [
        Validators.required,

      ]]
    });
    this.lpform = this.fb.group({
      landmark: ['', [
        Validators.required
      ]],
      pincode: ['', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]],
    
    });
  }

  async okclick() {
const npvalue = this.npform.value;
    const addvalue = this.addform.value;
    const lpvalue = this.lpform.value;
    const orderdet = { ...npvalue, ...addvalue, ...lpvalue };
    const increment = firebase.firestore.FieldValue.increment(1);
 var senddata = this.afs.firestore.collection("orderitems").doc(`${Math.random()}`);
    var sendcc = this.afs.firestore.collection('orderscounter').doc('orderscount');
    const totcount = this.afs.firestore.collection("orderscounter").doc("orderscount");
    try {

      await firebase.firestore().runTransaction(transaction =>
        transaction.get(totcount).then(totdoc => {

          // console.log(totdoc.data().totord);
          const newono: number = totdoc.data().totord + 1;
          var paym: number = 351;
         const data: any[] = [];
         const ordcat:any[]=[];
         ordcat['250ml']=15;
         ordcat['250ml']=30;
          data['ordlist']=ordcat;
          data['ordno'] = newono;
          data['pay'] = paym;
          this.npform.value.ordno=newono;
          transaction.set(senddata, { ...orderdet, ...data });
          transaction.set(sendcc, { totord: increment }, { merge: true })

        }))
        .catch(err => console.error(err));

    } catch (err) {
      console.error(err)
    }
    this.npform.reset();
    this.addform.reset();
    this.lpform.reset();

  }

  displayform(quant: string) {
    this.showchip = false;
    this.showform = true;
    this.quantp = quant;
    this.showm = false;
    this.showmm = true;
  }
  cancel(){
    this.showchip = true;
    this.showform = false;
    this.showm = true;
    this.showmm = false;
  }

  displayc(qun: number) {
    this.showchip = true;
    this.showform = false;
    this.showm = true;
    this.showmm = false;

    switch (this.quantp) {
      case "250ml": {
        this.quant250 = `${this.quantp}(${qun})`;
        this.q250 = qun;
        break;
      }
      case "500ml": {
        this.quant500 = `${this.quantp}(${qun})`;
        this.q500 = qun;
        break;
      }

      case "1ltr": {
        this.quant1ltr = `${this.quantp}(${qun})`;
        this.q1 = qun;
        break;
      }
      case "2ltr": {
        this.quant2ltr = `${this.quantp}(${qun})`;
        this.q2 = qun;
        break;
      }
      case "25ltr": {
        this.quant25ltr = `${this.quantp}(${qun})`;
        this.q25 = qun;
        break;
      }

    }

  }

  clearme() {
    this.quant250 = "250ml";
    this.quant500 = "500ml";
    this.quant1ltr = "1ltr";
    this.quant2ltr = "2ltr";
    this.quant25ltr = "25lr";
    this.q1 = null;
    this.q2 = null;
    this.q25 = null;
    this.q250 = null;
    this.q500 = null;

  }
  // get name(){
  //   return this.npform.get('name');
  // }
  // get phone(){
  //   return this.npform.get('phone');
  // }  
  // get address(){
  //   return this.addform.get('address');
  // }  
  // get landmark(){
  //   return this.lpform.get('landmark');
  // }  
  // get pincode(){
  //   return this.lpform.get('pincode');
  // }  

}





