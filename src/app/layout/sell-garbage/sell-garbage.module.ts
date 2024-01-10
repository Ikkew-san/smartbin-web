import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellGarbageRoutingModule } from './sell-garbage-routing.module';
import { SellGarbageComponent } from './sell-garbage.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [SellGarbageComponent],
  imports: [
    CommonModule,
    SellGarbageRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class SellGarbageModule { }
