import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembeshipsComponent } from './membeships/membeships.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { SalesComponent } from './sales/sales.component';
import { WorkersComponent } from './workers/workers.component';


const routes: Routes = [
  {path : '',component:HomeComponent},
   {path : 'membership',component:MembeshipsComponent},
   {path : 'orders',component:OrdersComponent},
   {path : 'sales',component:SalesComponent},
   {path : 'workers',component:WorkersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
