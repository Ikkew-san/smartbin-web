import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingRoutingModule } from './buying-routing.module';
import { BuyingComponent } from './buying.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuyingComponent],
  imports: [
    CommonModule,
    BuyingRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class BuyingModule { }
