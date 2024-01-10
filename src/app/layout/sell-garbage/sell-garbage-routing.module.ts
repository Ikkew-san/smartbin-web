import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellGarbageComponent } from './sell-garbage.component';

const routes: Routes = [{ path: '', component: SellGarbageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellGarbageRoutingModule { }
