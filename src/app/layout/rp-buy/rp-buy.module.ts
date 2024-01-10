import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpBuyRoutingModule } from './rp-buy-routing.module';
import { RpBuyComponent } from './rp-buy.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RpBuyComponent],
  imports: [
    CommonModule,
    RpBuyRoutingModule,
    FormsModule
  ]
})
export class RpBuyModule { }
