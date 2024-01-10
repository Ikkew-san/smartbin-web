import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingComponent } from './buying.component';

const routes: Routes = [{ path: "", component:  BuyingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyingRoutingModule { }
