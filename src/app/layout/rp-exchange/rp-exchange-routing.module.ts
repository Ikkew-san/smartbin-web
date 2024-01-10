import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpExchangeComponent } from './rp-exchange.component';

const routes: Routes = [{ path: '', component: RpExchangeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpExchangeRoutingModule { }
