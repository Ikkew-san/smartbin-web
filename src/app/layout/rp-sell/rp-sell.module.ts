import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpSellRoutingModule } from './rp-sell-routing.module';
import { RpSellComponent } from './rp-sell.component';

@NgModule({
  declarations: [RpSellComponent],
  imports: [
    CommonModule,
    RpSellRoutingModule
  ]
})
export class RpSellModule { }
