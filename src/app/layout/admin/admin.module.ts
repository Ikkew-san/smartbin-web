import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { ImageCropperModule } from "ngx-image-cropper";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    ConfirmationPopoverModule.forRoot()
  ]
})
export class AdminModule { }
