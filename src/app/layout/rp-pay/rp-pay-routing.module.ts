import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpPayComponent } from './rp-pay.component';

const routes: Routes = [{ path: "", component: RpPayComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpPayRoutingModule { }
