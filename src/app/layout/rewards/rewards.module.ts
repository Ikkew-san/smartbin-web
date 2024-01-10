import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from "ngx-image-cropper";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [RewardsComponent],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    FormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    ConfirmationPopoverModule.forRoot()
  ]
})
export class RewardsModule { }
