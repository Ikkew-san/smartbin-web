import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpCumulativeComponent } from './rp-cumulative.component';

const routes: Routes = [{ path: "", component: RpCumulativeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpCumulativeRoutingModule { }
