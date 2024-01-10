import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpSellComponent } from './rp-sell.component';

const routes: Routes = [{ path: "", component: RpSellComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpSellRoutingModule { }
